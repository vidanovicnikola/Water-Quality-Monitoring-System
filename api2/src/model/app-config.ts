export interface AppConfig {
  relevantStations: string[];
  signals: {
    name: string;
    displayRange: ValueRange;
    optimalRange: ValueRange;
  }[];
}

export interface ValueRange {
  from: number;
  to: number;
}
