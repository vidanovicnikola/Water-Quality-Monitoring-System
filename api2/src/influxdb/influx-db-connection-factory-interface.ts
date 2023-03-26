import { QueryApi } from '@influxdata/influxdb-client';

export interface IInfluxDBConnectionFactory {
  bucket: string;
  queryApi: QueryApi;
}
