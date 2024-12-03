import { Body, Controller, Post, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
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
  @ApiOperation({ summary: 'List all areas' })
  async getAreas() {
    return this.areaService.getAllAreas();
  }
}
