import { Station } from './station';
import { ExtendedWarning } from './warning';

export interface StationWarnings {
  station: Station;
  warnings: ExtendedWarning[];
}
