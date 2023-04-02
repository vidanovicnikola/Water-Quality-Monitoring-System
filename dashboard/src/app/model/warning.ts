export class Warning {
  stationId: string;
  signal: string;
  value: number;
}

export class ExtendedWarning extends Warning {
  message: string;
  icon: string;
  unit: string;
}

export const warningMessageMap = new Map<
  string,
  { message: string; icon: string; unit: string }
>([
  [
    'air_temp_degc',
    { message: 'air_temp', icon: 'device_thermostat', unit: '°C' },
  ],
  [
    'sea_surface_temp_degc',
    { message: 'sea_surface_temp', icon: 'device_thermostat', unit: '°C' },
  ],
  [
    'dewpoint_temp_degc',
    { message: 'dewpoint_temp', icon: 'device_thermostat', unit: '°C' },
  ],
  ['wind_speed_mps', { message: 'wind_speed', icon: 'air', unit: 'm/s' }],
  [
    'significant_wave_height_m',
    { message: 'significant_wave_height', icon: 'waves', unit: 'm' },
  ],
  [
    'avg_wave_period_sec',
    { message: 'avg_wave_period', icon: 'waves', unit: 's' },
  ],
  [
    'dominant_wave_period_sec',
    { message: 'dominant_wave_period', icon: 'waves', unit: 's' },
  ],
  [
    'sea_level_pressure_hpa',
    { message: 'sea_level_pressure', icon: '', unit: 'Pa' },
  ],
]);
