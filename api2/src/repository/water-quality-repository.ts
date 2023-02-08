import { InfluxDB, QueryApi } from '@influxdata/influxdb-client';
import { Injectable } from '@nestjs/common';
import { ImportedInfluxObject, InfluxObject } from 'src/model/influx-object';
import { rowMapper } from 'src/shared/influx-row-mapper';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigService } from 'src/services/config-service';

@Injectable()
export class WaterQualityRepository {
  client: InfluxDB;
  queryApi: QueryApi;
  org = 'Elfak';
  bucket = 'noaadblatest';

  constructor(private configService: ConfigService) {
    const token =
      'MtnN-PdwPLY_lNi6F5agCkyemBUF7QIcU6mI3fMj7kNojXsQkSjT7TVQPcE978pA7_bw-zsqNEXjJo4XWQilRw==';
    const org = 'Elfak';

    const client = new InfluxDB({ url: 'http://localhost:8086', token: token });
    this.queryApi = client.getQueryApi(org);
  }

  getAllSignals(
    signalName: string,
    startDate: Date,
    endDate: Date,
    numberOfPoints: number,
  ): Promise<InfluxObject[]> {
    const hours = Math.abs(endDate.getTime() - startDate.getTime()) / 36e5;
    const window = Math.round(hours / numberOfPoints);

    const query = `from(bucket: "${this.bucket}")
                    |> range(start: ${startDate.toISOString()}, stop: ${endDate.toISOString()})
                    |> filter(fn: (r) => r["_field"] == "${signalName}")
                    |> aggregateWindow(every: ${window}h, fn: mean)`;
    return this.queryApi.collectRows(query, (row) => rowMapper(row));
  }

  getSignalsForStation(
    stationId: string,
    startDate: Date,
    endDate: Date,
    numberOfPoints: number,
  ): Promise<InfluxObject[]> {
    const hours = Math.abs(endDate.getTime() - startDate.getTime()) / 36e5;
    const window = Math.round(hours / numberOfPoints);

    const query = `from(bucket: "${this.bucket}")
                    |> range(start: ${startDate.toISOString()}, stop: ${endDate.toISOString()})
                    |> filter(fn: (r) => r["station_id"] == "${stationId}")
                    |> aggregateWindow(every: ${window}h, fn: mean)`;
    return this.queryApi.collectRows(query, (row) => rowMapper(row));
  }

  getStationInfo(stationId: string) {
    const query = `from(bucket: "${this.bucket}")
                    |> range(start: -1y)
                    |> filter(fn: (r) => r["station_id"] == "${stationId}")
                    |> pivot(
                      rowKey:["station_id"],
                      columnKey: ["_field"],
                      valueColumn: "_value"
                    )`;
    return this.queryApi.collectRows(query);
  }

  getAllStations() {
    const query = `from(bucket: "${this.bucket}")
                    |> range(start: -1y)
                    |> pivot(
                      rowKey:["station_id"],
                      columnKey: ["_field"],
                      valueColumn: "_value"
                    )`;
    return this.queryApi.collectRows(query);
  }

  importData(): Promise<ImportedInfluxObject[]> {
    const relevantStations = JSON.stringify(
      this.configService.config.relevantStations,
    );
    const query = `import "experimental/csv"
                   csv.from(url: "https://raw.githubusercontent.com/influxdata/influxdb2-sample-data/master/noaa-ndbc-data/latest-observations-annotated.csv")
                   |> filter(fn: (r) => contains(value: r["station_id"], set: ${relevantStations}))
                   |> to(bucket: "${this.bucket}")`;
    return this.queryApi.collectRows(query);
  }
}
