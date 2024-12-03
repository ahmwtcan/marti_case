import { Controller, Get, Query } from '@nestjs/common';
import { LogService } from './log.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller('logs')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get('')
  @ApiQuery({ name: 'cursor', required: false, type: Number })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  async getAllLogs(
    @Query('pageSize') pageSize: number,
    @Query('cursor') cursor?: number,
  ) {
    return this.logService.getAllLogs(Number(cursor), Number(pageSize));
  }
}
