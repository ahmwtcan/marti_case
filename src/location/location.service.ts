import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../libs/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class LocationService {
  constructor(private prisma: PrismaService) {}

  async logUserLocation(userId: number, lat: number, lng: number) {
    try {
      const areas: { id: number }[] = await this.prisma.$queryRaw`
      SELECT id
      FROM "Area"
      WHERE ST_Contains(
        boundary,
        ST_SetSRID(ST_Point(${lng}, ${lat}), 4326)
      );
    `;

      if (areas.length > 0) {
        await this.prisma.$executeRaw`
        INSERT INTO "Log" ("userId", "areaId")
        VALUES ${Prisma.join(
          areas.map((area) => Prisma.sql`(${userId}, ${area.id})`),
        )}
      `;
      }

      return {
        success: true,
        matchedAreas: areas.length > 0 ? areas : null,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to log user location.');
    }
  }
}
