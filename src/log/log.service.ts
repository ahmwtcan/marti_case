import { Injectable } from '@nestjs/common';
import { PrismaService } from '../libs/prisma/prisma.service';

@Injectable()
export class LogService {
  constructor(private prisma: PrismaService) {}

  async getAllLogs(cursor?: number, pageSize: number = 10) {
    const logs = await this.prisma.log.findMany({
      take: pageSize, // Limit the number of rows returned
      skip: cursor ? 1 : 0, // Skip the row identified by the cursor
      cursor: cursor ? { id: cursor } : undefined, // Start after the cursor if provided
      orderBy: { id: 'asc' }, // Order results by `id`
      include: {
        user: true, // Include user details
        area: true, // Include area details
      },
    });

    // Calculate the next cursor
    const nextCursor = logs.length > 0 ? logs[logs.length - 1].id : null;

    return {
      logs,
      nextCursor, // Include the cursor for the next page in the response
    };
  }
}
