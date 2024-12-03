import { ApiProperty } from '@nestjs/swagger';

export class CreateAreaDto {
  @ApiProperty({ example: 'Test Area' })
  name: string;

  @ApiProperty({
    example:
      'SRID=4326;POLYGON((-73.98142 40.7681, -73.95889 40.7681, -73.95889 40.75191, -73.98142 40.75191, -73.98142 40.7681))',
  })
  boundary: string;
}
