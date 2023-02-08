import { Pipe, PipeTransform } from '@angular/core';
import { ExtendedWarning, Warning } from '../model/warning';

@Pipe({ name: 'warningsFilter' })
export class WarningsFilterPipe implements PipeTransform {
  transform(warnings: ExtendedWarning[], stationId: string): ExtendedWarning[] {
    return warnings.filter((x) => x.stationId == stationId);
  }
}
