import { Injectable } from '@nestjs/common';
import { PrismaService } from '../libs/prisma/prisma.service';

@Injectable()
export class LogService {
  constructor(private prisma: PrismaService) {}

  async getAllLogs(cursor?: number, pageSize: number = 10) {
    const logs = await this.prisma.log.findMany({
      take: pageSize,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { id: 'asc' },
      select: {
        id: true,
        entryTime: true,
        user: { select: { id: true, name: true } },
        area: { select: { id: true, name: true } },
      },
    });

    const nextCursor = logs.length > 0 ? logs[logs.length - 1].id : null;

    return {
      logs,
      nextCursor,
    };
  }
}
