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

  async getAllAreas() {
    return this.prisma.area.findMany();
  }
}
