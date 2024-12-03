import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';

export const options = {
    stages: [
        { duration: '30s', target: 50 }, // Ramp-up to 50 users over 30 seconds
        { duration: '20s', target: 100 }, // Steady load of 100 users for 1 minute
        { duration: '30s', target: 0 }, // Ramp-down to 0 users
    ],
};

const BASE_URL = 'http://localhost:3000';

function getRandomCoordinates() {
    const insidePolygonProbability = 0.3; // 30% of coordinates inside the polygon
    const isInsidePolygon = Math.random() < insidePolygonProbability;

    if (isInsidePolygon) {
        // Generate coordinates inside the polygon's bounding box
        const minLat = 40.9285;
        const maxLat = 40.9292;
        const minLng = 29.1255;
        const maxLng = 29.1265;

        const lat = Math.random() * (maxLat - minLat) + minLat;
        const lng = Math.random() * (maxLng - minLng) + minLng;

        return { lat, lng };
    } else {
        // Generate coordinates outside the polygon's bounding box
        const minLat = 40.9200; // Adjust these bounds as needed
        const maxLat = 40.9350;
        const minLng = 29.1100;
        const maxLng = 29.1400;

        const lat = Math.random() * (maxLat - minLat) + minLat;
        const lng = Math.random() * (maxLng - minLng) + minLng;

        return { lat, lng };
    }
}
function fetchPaginatedData(endpoint, initialCursor = null, pageSize = 5) {
    let cursor = initialCursor;

    for (let i = 0; i < 3; i++) { // Fetch up to 3 pages in this iteration
        const res = http.get(`${BASE_URL}/${endpoint}?pageSize=${pageSize}&cursor=${cursor || ''}`);

        // Validate response
        check(res, {
            [`${endpoint} get 200`]: (r) => r.status === 200,
            [`${endpoint} contains data`]: (r) => {
                const response = JSON.parse(r.body);
                return response[endpoint] && Array.isArray(response[endpoint]) && response[endpoint].length > 0;
            },
        });

        // Extract next cursor
        const response = JSON.parse(res.body);
        cursor = response.nextCursor;

        // If no nextCursor, stop pagination
        if (!cursor) {
            break;
        }

        sleep(1); // Simulate delay between paginated requests
    }
}
export default function () {
    const { lat, lng } = getRandomCoordinates();

    // Decide the type of request: 70% for location logging, 30% for area creation
    if (Math.random() < 0.7) {
        // Location logging request
        const locationPayload = JSON.stringify({
            userId: Math.floor(Math.random() * 10) + 1, // Random user ID
            lat: lat, // Random latitude around Maltepe
            lng: lng, // Random longitude around Maltepe
        });

        const locationParams = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const locationRes = http.post(`${BASE_URL}/locations`, locationPayload, locationParams);

        // Check for successful response
        check(locationRes, {
            'status is 201': (r) => r.status === 201,
        });

    } else {
        // Area creation request
        const areaPayload = JSON.stringify({
            name: `Test Area ${__VU}-${__ITER}`, // Unique area name
            boundary: 'SRID=4326;POLYGON((29.1255 40.9292, 29.1265 40.9292, 29.1265 40.9285, 29.1255 40.9285, 29.1255 40.9292))',
        });

        const areaParams = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const areaRes = http.post(`${BASE_URL}/areas`, areaPayload, areaParams);

        // Check for successful response
        check(areaRes, {
            'status is 201': (r) => r.status === 201,
        });
    }



    fetchPaginatedData('areas', null, 5);

    // Fetch paginated logs
    fetchPaginatedData('logs', null, 5);



    // Pause for 1 second between iterations
    sleep(1);
}