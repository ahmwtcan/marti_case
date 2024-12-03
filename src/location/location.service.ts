import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LocationService {
  constructor(private prisma: PrismaService) {}

  async logUserLocation(userId: number, lat: number, lng: number) {
    const areas: { id: number }[] = await this.prisma.$queryRaw`
      SELECT id FROM "Area"
      WHERE ST_Contains(boundary, ST_SetSRID(ST_Point(${lng}, ${lat}), 4326))
    `;

    if (areas.length > 0) {
      await this.prisma.log.create({
        data: {
          userId,
          areaId: areas[0].id,
        },
      });
    }

    return {
      success: true,
      matchedArea: areas.length > 0 ? areas[0].id : null,
    };
  }
}
