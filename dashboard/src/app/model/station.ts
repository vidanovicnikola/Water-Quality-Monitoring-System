export interface Station {
  station_id: string;
  station_name: string;
  station_owner: string;
  station_pgm: string;
  station_type: string;
  lat: string;
  lon: string;
  sea_level_pressure_hpa: string;
  wind_dir_degt: string;
  wind_speed_mps: string;
  water_level_ft: string;
  significant_wave_height_m: string;
  air_temp_degc: string;
  dewpoint_temp_degc: string;
  sea_surface_temp_degc: string;
  avg_wave_period_sec: string;
  dominant_wave_period_sec: string;
  animation: google.maps.Animation | null;
}
