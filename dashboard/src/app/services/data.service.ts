import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as Highcharts from 'highcharts';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ChartDataModel } from '../model/chart-data-model';
import { Marker } from '../model/marker';
import { Station } from '../model/station';
import { ChartsService } from './charts.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  baseUrl = 'http://localhost:3000/WaterQuality';
  constructor(private http: HttpClient, private charts: ChartsService) {}

  getStationInfo(stationId: string): Observable<Station[]> {
    const httpParams = new HttpParams().append('id', stationId);
    return this.http.get<Station[]>(`${this.baseUrl}/Station`, {
      params: httpParams,
    });
  }

  getAllStations(): Observable<Station[]> {
    return this.http.get<Station[]>(`${this.baseUrl}/AllStations`);
  }

  getSignalsForStation(
    stationId: string,
    startDate: Date,
    endDate: Date,
    numberOfPoints: number
  ): Observable<Highcharts.Options[]> {
    const httpParams = new HttpParams()
      .append('id', stationId)
      .append('start', startDate.toUTCString())
      .append('end', endDate.toUTCString())
      .append('numberOfPoints', numberOfPoints);

    return this.http
      .get<ChartDataModel[]>(`${this.baseUrl}/Signals`, {
        params: httpParams,
      })
      .pipe(
        map((charts) =>
          charts.map((chart) => this.charts.getStandardChart(chart))
        )
      );
  }

  getAllSignals(
    signalName: string,
    startDate: Date,
    endDate: Date,
    numberOfPoints: number
  ): Observable<Highcharts.Options[]> {
    const httpParams = new HttpParams()
      .append('signalName', signalName)
      .append('start', startDate.toUTCString())
      .append('end', endDate.toUTCString())
      .append('numberOfPoints', numberOfPoints);

    return this.http
      .get<ChartDataModel[]>(`${this.baseUrl}/SignalData`, {
        params: httpParams,
      })
      .pipe(
        map((charts) =>
          charts.map((chart) => this.charts.getStandardChart(chart))
        )
      );
  }
}
