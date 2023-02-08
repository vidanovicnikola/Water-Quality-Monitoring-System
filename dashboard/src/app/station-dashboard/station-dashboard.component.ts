import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import * as Highcharts from 'highcharts';
import more from 'highcharts/highcharts-more';
import bullet from 'highcharts/modules/bullet.js';
import solidGauge from 'highcharts/modules/solid-gauge.js';
import { Station } from '../model/station';
import { ChartsService } from '../services/charts.service';

more(Highcharts);
bullet(Highcharts);
bullet(Highcharts);
solidGauge(Highcharts);

@Component({
  selector: 'station-dashboard',
  templateUrl: './station-dashboard.component.html',
  styleUrls: ['./station-dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StationDashboardComponent implements OnInit {
  @Input() stationLatestData: Station;

  Highcharts = Highcharts;
  temperatureChart: Highcharts.Options;
  pressureChart: Highcharts.Options;
  windSpeedChart: Highcharts.Options;
  waterLevelChart: Highcharts.Options;
  waveHeightChart: Highcharts.Options;
  wavePeriodChart: Highcharts.Options;

  constructor(private chartsService: ChartsService) {}

  ngOnInit(): void {
    this.pressureChart = this.chartsService.getSpeedGaugeChartOptions(
      +this.stationLatestData.sea_level_pressure_hpa,
      990,
      1050,
      'Sea Level Pressure',
      ' Pa'
    );
    this.windSpeedChart = this.chartsService.getSolidGaugeOptions(
      +this.stationLatestData.wind_speed_mps,
      0,
      50,
      'Wind Speed',
      'm/s'
    );
    this.waterLevelChart = this.chartsService.getBulletChartOptions(
      +this.stationLatestData.water_level_ft,
      0,
      100,
      'Water Level (m)'
    );
    this.waveHeightChart = this.chartsService.getBulletChartOptions(
      +this.stationLatestData.significant_wave_height_m,
      0,
      100,
      'Wave Height (m)'
    );
    this.temperatureChart = this.chartsService.getColumnChartOptions(
      [
        {
          label: 'Air',
          value: +this.stationLatestData.air_temp_degc,
        },
        {
          label: 'Sea Surface',
          value: +this.stationLatestData.sea_surface_temp_degc,
        },
        {
          label: 'Dewpoint',
          value: +this.stationLatestData.dewpoint_temp_degc,
        },
      ],
      'Temperature',
      'Temperature °C'
    );
    this.temperatureChart = this.chartsService.getColumnChartOptions(
      [
        {
          label: 'Air',
          value: +this.stationLatestData.air_temp_degc,
        },
        {
          label: 'Sea Surface',
          value: +this.stationLatestData.sea_surface_temp_degc,
        },
        {
          label: 'Dewpoint',
          value: +this.stationLatestData.dewpoint_temp_degc,
        },
      ],
      'Temperature',
      'Temperature °C'
    );
    this.wavePeriodChart = this.chartsService.getColumnChartOptions(
      [
        {
          label: 'Avg period',
          value: +this.stationLatestData.avg_wave_period_sec,
        },
        {
          label: 'Dominant period',
          value: +this.stationLatestData.dominant_wave_period_sec,
        },
      ],
      'Wave Period',
      ' sec'
    );
  }
}
