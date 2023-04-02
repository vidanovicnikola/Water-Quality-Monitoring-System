import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { AppConfig } from 'src/model/app-config';

@Injectable()
export class ConfigService {
  unsupportedSignalsForLineChart = [
    'lat',
    'lon',
    'pressure_tendency_hpa',
    'station_currents',
    'station_dart',
    'station_elev',
    'station_met',
    'station_visibility_nmi',
    'station_waterquality',
    'wave_dir_degt',
    'wind_dir_degt',
  ];

  private configPath = path.resolve(__dirname, '../config.txt');
  private config: AppConfig;

  constructor() {
    this.config = this.loadConfigFromFile();
    if (this.config == null) {
      this.config = this.defaultConfig();
      this.writeConfigInFile(this.config);
    }
  }

  loadConfigFromFile(): AppConfig {
    if (fs.existsSync(this.configPath)) {
      const data = fs.readFileSync(this.configPath);
      return JSON.parse(data.toString());
    }
    return null;
  }

  writeConfigInFile(data: AppConfig): AppConfig {
    fs.writeFileSync(this.configPath, JSON.stringify(data));
    return data;
  }

  private defaultConfig(): AppConfig {
    const defaultConfig: AppConfig = {
      relevantStations: [
        '13001',
        '15001',
        '28401',
        '31006',
        '41033',
        '42055',
        '44066',
        '46028',
        '46205',
        '63110',
        'TFBLK',
      ],
      signals: [
        {
          name: 'air_temp_degc',
          optimalRange: { from: -5, to: 35 },
          displayRange: { from: -15, to: 45 },
        },
        {
          name: 'sea_surface_temp_degc',
          optimalRange: { from: 0, to: 30 },
          displayRange: { from: -5, to: 40 },
        },
        {
          name: 'dewpoint_temp_degc',
          optimalRange: { from: 5, to: 30 },
          displayRange: { from: -5, to: 30 },
        },
        {
          name: 'wind_speed_mps',
          optimalRange: { from: 0, to: 20 },
          displayRange: { from: 0, to: 40 },
        },
        {
          name: 'significant_wave_height_m',
          optimalRange: { from: 0, to: 2 },
          displayRange: { from: 0, to: 10 },
        },
        {
          name: 'avg_wave_period_sec',
          optimalRange: { from: 5, to: 15 },
          displayRange: { from: 0, to: 15 },
        },
        {
          name: 'dominant_wave_period_sec',
          optimalRange: { from: 5, to: 15 },
          displayRange: { from: 0, to: 15 },
        },
        {
          name: 'sea_level_pressure_hpa',
          optimalRange: { from: 995, to: 1030 },
          displayRange: { from: 990, to: 1035 },
        },
      ],
    };
    return defaultConfig;
  }
}
