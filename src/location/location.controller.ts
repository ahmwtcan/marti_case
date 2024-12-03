import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { LocationService } from './location.service';

@ApiTags('locations') // Group this controller under "locations"
@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @ApiOperation({ summary: 'Log user location' }) // Add operation summary
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'integer', example: 1 },
        lat: { type: 'number', example: 40.7128 },
        lng: { type: 'number', example: -74.006 },
      },
    },
  }) // Define request body schema
  async logLocation(
    @Body() body: { userId: number; lat: number; lng: number },
  ) {
    return this.locationService.logUserLocation(
      body.userId,
      body.lat,
      body.lng,
    );
  }
}
