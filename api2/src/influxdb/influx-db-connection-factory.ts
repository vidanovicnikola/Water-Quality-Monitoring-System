import { InfluxDB, QueryApi } from '@influxdata/influxdb-client';
import { Injectable } from '@nestjs/common';
import { IInfluxDBConnectionFactory } from './influx-db-connection-factory-interface';

@Injectable()
export class InfluxDBConnectionFactory implements IInfluxDBConnectionFactory {
  public queryApi: QueryApi;
  public bucket = 'world_ocean_data';
  private token =
    'MtnN-PdwPLY_lNi6F5agCkyemBUF7QIcU6mI3fMj7kNojXsQkSjT7TVQPcE978pA7_bw-zsqNEXjJo4XWQilRw==';
  private org = 'Elfak';
  private client: InfluxDB;

  constructor() {
    this.client = new InfluxDB({
      url: 'http://localhost:8086',
      token: this.token,
    });
    this.queryApi = this.client.getQueryApi(this.org);
  }
}
