import { HttpModule, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { WaterQualityController } from './controllers/water-quality-controller';
import { WaterQualityRepository } from './repository/water-quality-repository';
import { ConfigService } from './services/config-service';
import { ImportDataService } from './services/import-data-service';
import { WaterQualityService } from './services/water-quality-service';

@Module({
  imports: [HttpModule, ScheduleModule.forRoot()],
  controllers: [WaterQualityController],
  providers: [
    WaterQualityRepository,
    WaterQualityService,
    ImportDataService,
    ConfigService,
  ],
})
export class AppModule {}
