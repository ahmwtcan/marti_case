import { Injectable } from '@nestjs/common';
import { PrismaService } from '../libs/prisma/prisma.service';

@Injectable()
export class AreaService {
  constructor(private prisma: PrismaService) {}

  async createArea(name: string, boundary: string) {
    return this.prisma.$executeRaw`
      INSERT INTO "Area" (name, boundary, createdAt, updatedAt)
      VALUES (${name}, ST_GeographyFromText(${boundary}), NOW(), NOW())
    `;
  }

  async getAllAreas() {
    return this.prisma.area.findMany();
  }
}
