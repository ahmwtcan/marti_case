import { Injectable } from '@nestjs/common';
import { PrismaService } from '../libs/prisma/prisma.service';

@Injectable()
export class LogService {
  constructor(private prisma: PrismaService) {}

  async getAllLogs() {
    return this.prisma.log.findMany({
      include: {
        user: true,
        area: true,
      },
    });
  }
}
