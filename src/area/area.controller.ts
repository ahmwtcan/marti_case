import { Body, Controller, Post, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { AreaService } from './area.service';
import { CreateAreaDto } from './dto/create-area.dto';

@ApiTags('areas')
@Controller('areas')
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new area' })
  async createArea(@Body() createAreaDto: CreateAreaDto) {
    return this.areaService.createArea(
      createAreaDto.name,
      createAreaDto.boundary,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all areas' })
  @ApiQuery({ name: 'cursor', required: false, type: Number })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  async getAllAreas(
    @Query('pageSize') pageSize: number,
    @Query('cursor') cursor?: number,
  ) {
    return this.areaService.getAllAreas(Number(cursor), Number(pageSize));
  }
}
