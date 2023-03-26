import { HttpModule, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { WaterQualityController } from './controllers/water-quality-controller';
import { InfluxDBConnectionFactory } from './influxdb/influx-db-connection-factory';
import { WaterQualityRepository } from './repository/water-quality-repository';
import { ConfigService } from './services/config.service';
import { ImportDataService } from './services/import-data.service';
import { WaterQualityService } from './services/water-quality.service';

const dbConnectionFactory = () => new InfluxDBConnectionFactory();
const dbConnectionProvider = {
  provide: 'IInfluxDBConnectionFactory',
  useFactory: dbConnectionFactory,
};

@Module({
  imports: [HttpModule, ScheduleModule.forRoot()],
  controllers: [WaterQualityController],
  providers: [
    WaterQualityService,
    ImportDataService,
    ConfigService,
    dbConnectionProvider,
    {
      provide: 'IWaterQualityRepository',
      useClass: WaterQualityRepository,
    },
  ],
})
export class AppModule {}
