export class Marker {
  constructor(id: string, name: string, lat: number, lon: number) {
    this.id = id;
    this.name = name;
    this.lat = lat;
    this.lng = lon;
  }

  id: string;
  name: string;
  lat: number;
  lng: number;
}
