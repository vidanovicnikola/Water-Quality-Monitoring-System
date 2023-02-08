import { Component } from '@angular/core';
import { StationWarnings } from '../model/station-warnings';

@Component({
  selector: 'station-tooltip-component',
  templateUrl: './station-tooltip.component.html',
  styleUrls: ['./station-tooltip.component.scss'],
})
export class StationTooltipComponent {
  data: StationWarnings;
  left: number = 0;
  top: number = 0;
}
