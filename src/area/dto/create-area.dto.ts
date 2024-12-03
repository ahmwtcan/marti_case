import { ApiProperty } from '@nestjs/swagger';

export class CreateAreaDto {
  @ApiProperty({ example: 'Maltepe' })
  name: string;

  @ApiProperty({
    example:
      'SRID=4326;POLYGON((29.1255 40.9292, 29.1265 40.9292, 29.1265 40.9285, 29.1255 40.9285, 29.1255 40.9292))',
  })
  boundary: string;
}
