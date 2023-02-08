import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export interface AppConfig {
  relevantStations: string[];
  normalValues: { signal: string; min: number; max: number }[];
}

@Injectable()
export class ConfigService {
  private configPath = path.resolve(__dirname, '../config.txt');
  config: AppConfig;

  constructor() {
    this.config = this.loadConfigFromFile();
    if (this.config == null) {
      this.config = this.defaultConfig();
      this.writeConfigInFile(this.config);
    }
  }

  private loadConfigFromFile(): AppConfig {
    if (fs.existsSync(this.configPath)) {
      const data = fs.readFileSync(this.configPath);
      return JSON.parse(data.toString());
    }
    return null;
  }

  private writeConfigInFile(data: AppConfig): void {
    fs.writeFileSync(this.configPath, JSON.stringify(data));
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
      normalValues: [
        { signal: 'dewpoint_temp_degc', min: 5, max: 30 },
        { signal: 'wind_speed_mps', min: 0, max: 13.5 },
        { signal: 'significant_wave_height_m', min: 0, max: 2 },
      ],
    };
    return defaultConfig;
  }
}
