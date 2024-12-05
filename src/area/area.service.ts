import { Injectable } from '@nestjs/common';
import { PrismaService } from '../libs/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AreaService {
  constructor(private prisma: PrismaService) {}
  async createArea(name: string, boundary: string) {
    const query = Prisma.sql`
      INSERT INTO "Area" (name, boundary)
      VALUES (${name}, ST_GeometryFromText(${boundary}, 4326))
    `;

    await this.prisma.$executeRaw(query);
  }
  async getAllAreas(cursor?: number, pageSize: number = 10) {
    const areas = await this.prisma.area.findMany({
      take: pageSize,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { id: 'asc' },
    });

    const nextCursor = areas.length > 0 ? areas[areas.length - 1].id : null;

    return {
      areas,
      nextCursor,
    };
  }
}
