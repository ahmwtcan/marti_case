import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AreaService } from './area/area.service';
import { AreaController } from './area/area.controller';
import { LocationController } from './location/location.controller';
import { LocationService } from './location/location.service';
import { LogService } from './log/log.service';
import { LogController } from './log/log.controller';

@Module({
  imports: [PrismaModule],
  controllers: [AppController, AreaController, LocationController, LogController],
  providers: [AppService, AreaService, LocationService, LogService],
})
export class AppModule {}