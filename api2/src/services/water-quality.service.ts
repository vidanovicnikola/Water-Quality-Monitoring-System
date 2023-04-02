import { Inject, Injectable } from '@nestjs/common';
import { ChartDataModel } from 'src/model/chart-data-model';
import { InfluxObject } from 'src/model/influx-object';
import { IWaterQualityRepository } from 'src/repository/water-quality-repository-interface';

@Injectable()
export class WaterQualityService {
  constructor(
    @Inject('IWaterQualityRepository')
    private waterQualityRepository: IWaterQualityRepository,
  ) {}

  getStationInfo(stationId: string) {
    return this.waterQualityRepository.getStationInfo(stationId);
  }

  getAllSignals(
    signalName: string,
    startDate: Date,
    endDate: Date,
    numberOfPoints: number,
  ): Promise<ChartDataModel[]> {
    return this.waterQualityRepository
      .getAllSignals(signalName, startDate, endDate, numberOfPoints)
      .then((data) => {
        const result = this.groupDataByStations(data, 'stationName');
        return result;
      });
  }

  getSignalsForStation(
    stationId: string,
    startDate: Date,
    endDate: Date,
    numberOfPoints: number,
  ): Promise<ChartDataModel[]> {
    return this.waterQualityRepository
      .getSignalsForStation(stationId, startDate, endDate, numberOfPoints)
      .then((data) => {
        const result = this.groupDataByStations(data, 'field');
        return result;
      });
  }

  getAllStations() {
    return this.waterQualityRepository.getAllStations();
  }

  getDistinctSignalNames(): Promise<string[]> {
    return this.waterQualityRepository.getDistinctSignalNames();
  }

  private groupDataByStations(
    data: InfluxObject[],
    titlePropertyName: keyof InfluxObject,
  ): ChartDataModel[] {
    const tables = [
      ...new Set(
        data
          .filter((x) => x.field != 'lat' && x.field != 'lon')
          .map((x) => x.table),
      ),
    ];
    const result: ChartDataModel[] = [];

    tables.forEach((table) => {
      const dataPoints = data.filter(
        (x) => x.table === table && x.stationId != null,
      );

      result.push({
        titile: dataPoints[0][titlePropertyName] as string,
        data: dataPoints.map((dp) => [dp.time.getTime(), dp.value]),
      });
    });

    return result;
  }
}
