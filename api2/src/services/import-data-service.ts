import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { BehaviorSubject } from 'rxjs';
import { Warning } from 'src/model/warning';
import { ImportedInfluxObject, InfluxObject } from 'src/model/influx-object';
import { WaterQualityRepository } from 'src/repository/water-quality-repository';
import { ConfigService } from './config-service';

@Injectable()
export class ImportDataService {
  alertUser$ = new BehaviorSubject<unknown[]>([]);

  constructor(
    private waterQualityRepository: WaterQualityRepository,
    private configService: ConfigService,
  ) {}

  @Cron('0 */1 * * * *')
  importData() {
    this.waterQualityRepository.importData().then((data) => {
      const alerts = this.processDataStream(data);
      this.alertUser$.next(alerts);
    });
  }

  private processDataStream(data: ImportedInfluxObject[]): Warning[] {
    const filters = this.configService.config.normalValues;
    var result = data
      .filter((x) =>
        this.checkValue(
          x,
          filters.find((f) => f.signal == x._field),
        ),
      )
      .map((x) => ({
        stationId: x.station_id,
        value: x._value,
        signal: x._field,
      }));

    return result;
  }

  checkValue(
    dataPoint: ImportedInfluxObject,
    filter?: { signal: string; min: number; max: number },
  ): boolean {
    if (filter == null) return false;

    if (dataPoint._value < filter.min || dataPoint._value > filter.max)
      return true;
  }
}
