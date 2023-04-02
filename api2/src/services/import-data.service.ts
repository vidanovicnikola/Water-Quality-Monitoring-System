import { Inject, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { BehaviorSubject } from 'rxjs';
import { Warning } from 'src/model/warning';
import { ImportedInfluxObject, InfluxObject } from 'src/model/influx-object';
import { ConfigService } from './config.service';
import { IWaterQualityRepository } from 'src/repository/water-quality-repository-interface';
import { ValueRange } from 'src/model/app-config';

@Injectable()
export class ImportDataService {
  alertUser$ = new BehaviorSubject<Warning[]>([]);

  constructor(
    @Inject('IWaterQualityRepository')
    private waterQualityRepository: IWaterQualityRepository,
    private configService: ConfigService,
  ) {}

  @Cron('0 */15 * * * *')
  importData() {
    this.waterQualityRepository.importData().then((data) => {
      const alerts = this.processDataStream(data);
      this.alertUser$.next(alerts);
    });
  }

  private processDataStream(data: ImportedInfluxObject[]): Warning[] {
    const filters = this.configService.loadConfigFromFile().signals;
    var result = data
      .filter((x) =>
        this.checkValue(
          x,
          filters.find((f) => f.name == x._field),
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
    filter?: {
      name: string;
      displayRange: ValueRange;
      optimalRange: ValueRange;
    },
  ): boolean {
    if (filter == null) return false;

    if (
      dataPoint._value < filter.optimalRange.from ||
      dataPoint._value > filter.optimalRange.to
    )
      return true;
  }
}
