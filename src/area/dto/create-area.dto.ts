import { ApiProperty } from '@nestjs/swagger';

export class CreateAreaDto {
  @ApiProperty({ example: 'Maltepe Gürsel Sok' })
  name: string;

  @ApiProperty({
    example:
      'SRID=4326;POLYGON((29.1335151 40.9208468, 29.1358755 40.9197605, 29.1333864 40.9161933, 29.1286442 40.9202793, 29.1335151 40.9208468))',
  })
  boundary: string;
}
