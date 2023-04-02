import { Inject, Injectable } from '@nestjs/common';
import { ImportedInfluxObject, InfluxObject } from 'src/model/influx-object';
import { rowMapper } from 'src/shared/influx-row-mapper';
import { ConfigService } from 'src/services/config.service';
import { IInfluxDBConnectionFactory } from 'src/influxdb/influx-db-connection-factory-interface';
import { IWaterQualityRepository } from './water-quality-repository-interface';

@Injectable()
export class WaterQualityRepository implements IWaterQualityRepository {
  constructor(
    @Inject('IInfluxDBConnectionFactory')
    private influxDbConnection: IInfluxDBConnectionFactory,
    private configService: ConfigService,
  ) {}

  getAllSignals(
    signalName: string,
    startDate: Date,
    endDate: Date,
    numberOfPoints: number,
  ): Promise<InfluxObject[]> {
    const hours = Math.abs(endDate.getTime() - startDate.getTime()) / 36e5;
    const window = Math.round(hours / numberOfPoints);

    const query = `from(bucket: "${this.influxDbConnection.bucket}")
                    |> range(start: ${startDate.toISOString()}, stop: ${endDate.toISOString()})
                    |> filter(fn: (r) => r["_field"] == "${signalName}")
                    |> aggregateWindow(every: ${window}h, fn: mean)`;
    return this.influxDbConnection.queryApi.collectRows(query, (row) =>
      rowMapper(row),
    );
  }

  getDistinctSignalNames(): Promise<string[]> {
    const query = `from(bucket: "${this.influxDbConnection.bucket}")
                    |> range(start: -1y)
                    |> keep(columns: ["_field"])
                    |> distinct()`;

    return this.influxDbConnection.queryApi
      .collectRows(query)
      .then((signals: ImportedInfluxObject[]) =>
        signals
          .map((s) => s._field)
          .filter(
            (s) =>
              !this.configService.unsupportedSignalsForLineChart.includes(s),
          ),
      );
  }

  getSignalsForStation(
    stationId: string,
    startDate: Date,
    endDate: Date,
    numberOfPoints: number,
  ): Promise<InfluxObject[]> {
    const hours = Math.abs(endDate.getTime() - startDate.getTime()) / 36e5;
    const window = Math.round(hours / numberOfPoints);

    const query = `from(bucket: "${this.influxDbConnection.bucket}")
                    |> range(start: ${startDate.toISOString()}, stop: ${endDate.toISOString()})
                    |> filter(fn: (r) => r["station_id"] == "${stationId}")
                    |> aggregateWindow(every: ${window}h, fn: mean)`;
    return this.influxDbConnection.queryApi.collectRows(query, (row) =>
      rowMapper(row),
    );
  }

  getStationInfo(stationId: string): Promise<string[]> {
    const query = `from(bucket: "${this.influxDbConnection.bucket}")
                    |> range(start: -1y)
                    |> filter(fn: (r) => r["station_id"] == "${stationId}")
                    |> pivot(
                      rowKey:["station_id"],
                      columnKey: ["_field"],
                      valueColumn: "_value"
                    )`;
    return this.influxDbConnection.queryApi.collectRows(query);
  }

  getAllStations(): Promise<ImportedInfluxObject[]> {
    const query = `from(bucket: "${this.influxDbConnection.bucket}")
                    |> range(start: -1y)
                    |> pivot(
                      rowKey:["station_id"],
                      columnKey: ["_field"],
                      valueColumn: "_value"
                    )`;
    return this.influxDbConnection.queryApi.collectRows(query);
  }

  importData(): Promise<ImportedInfluxObject[]> {
    const relevantStations = JSON.stringify(
      this.configService.loadConfigFromFile().relevantStations,
    );
    const query = `import "experimental/csv"
                   csv.from(url: "https://raw.githubusercontent.com/influxdata/influxdb2-sample-data/master/noaa-ndbc-data/latest-observations-annotated.csv")
                   |> filter(fn: (r) => contains(value: r["station_id"], set: ${relevantStations}))
                   |> to(bucket: "${this.influxDbConnection.bucket}")`;
    try {
      return this.influxDbConnection.queryApi.collectRows(query);
    } catch (error) {
      console.log(error);
    }
  }
}
