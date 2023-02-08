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
    'dewpoint_temp_degc',
    { message: 'Temperature warning', icon: 'device_thermostat', unit: '°C' },
  ],
  [
    'wind_speed_mps',
    { message: 'Wind speed warning', icon: 'air', unit: 'm/s' },
  ],
  [
    'significant_wave_height_m',
    { message: 'High waves warning', icon: 'waves', unit: 'm' },
  ],
]);
