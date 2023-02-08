export interface InfluxObject {
  table: number;
  time: Date;
  value: number;
  field: string;
  measurement: string;
  stationId: string;
  stationOwner: string;
  stationName: string;
}

export interface ImportedInfluxObject {
  table: number;
  _time: Date;
  _value: number;
  _field: string;
  _measurement: string;
  station_id: string;
  station_owner: string;
}
