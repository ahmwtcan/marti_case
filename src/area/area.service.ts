import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../libs/prisma/prisma.service';

@Injectable()
export class AreaService {
  constructor(private prisma: PrismaService) {}
  async createArea(name: string, boundary: string) {
    if (!isValidWKT(boundary)) {
      throw new InternalServerErrorException('Invalid boundary format.');

      //SRID=4326;POLYGON((0 0, 0 1, 1 1, 1 0, 0 0)) EWKT format
    }

    await this.prisma.$executeRaw`
      INSERT INTO "Area" (name, boundary)
      VALUES (${name}, ST_GeomFromEWKT(${boundary}));
    `;
  }
  async getAllAreas(cursor?: number, pageSize: number = 10) {
    const areas = await this.prisma.area.findMany({
      take: pageSize,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { id: 'asc' },
      select: {
        id: true,
        name: true,
      },
    });

    const nextCursor = areas.length > 0 ? areas[areas.length - 1].id : null;

    return {
      areas,
      nextCursor,
    };
  }
}
function isValidWKT(boundary: string): boolean {
  const regex = /^SRID=4326;POLYGON\(\([^\)]+\)\)$/i;
  return regex.test(boundary);
}
