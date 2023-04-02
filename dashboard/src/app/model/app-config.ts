export interface AppConfig {
  relevantStations: string[];
  signals: SignalSettings[];
}

export interface SignalSettings {
  name: string;
  displayRange: { from: number; to: number };
  optimalRange: { from: number | null; to: number | null };
}
