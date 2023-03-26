import { ImportedInfluxObject, InfluxObject } from 'src/model/influx-object';

export interface IWaterQualityRepository {
  getAllSignals(
    signalName: string,
    startDate: Date,
    endDate: Date,
    numberOfPoints: number,
  ): Promise<InfluxObject[]>;

  getSignalsForStation(
    stationId: string,
    startDate: Date,
    endDate: Date,
    numberOfPoints: number,
  ): Promise<InfluxObject[]>;

  getStationInfo(stationId: string): Promise<string[]>;

  getAllStations(): Promise<ImportedInfluxObject[]>;

  importData(): Promise<ImportedInfluxObject[]>;
}
