import { InfluxObject } from 'src/model/influx-object';

const TABLE = 1;
const TIME = 4;
const VALUE = 5;
const FIELD = 6;
const MEASUREMENT = 7;
const STATION_ID = 8;
const STATION_NAME = 9;
const STATION_OWNER = 10;

export const rowMapper = (row: string[]): InfluxObject => ({
  table: +row[TABLE],
  time: new Date(row[TIME]),
  value: +row[VALUE],
  field: row[FIELD],
  measurement: row[MEASUREMENT],
  stationId: row[STATION_ID],
  stationOwner: row[STATION_OWNER],
  stationName: row[STATION_NAME],
});
