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
      take: pageSize, // Limit the number of rows returned
      skip: cursor ? 1 : 0, // Skip the row identified by the cursor
      cursor: cursor ? { id: cursor } : undefined, // Start after the cursor if provided
      orderBy: { id: 'asc' }, // Order results by `id`
    });

    // Calculate the next cursor
    const nextCursor = areas.length > 0 ? areas[areas.length - 1].id : null;

    return {
      areas,
      nextCursor, // Include the cursor for the next page in the response
    };
  }
}
