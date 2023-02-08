import { Component, Input, OnInit } from '@angular/core';
import { StationWarnings } from '../../model/station-warnings';

@Component({
  selector: 'station-warnings',
  templateUrl: './station-warnings.component.html',
  styleUrls: ['./station-warnings.component.scss'],
})
export class StationWarningsComponent implements OnInit {
  @Input() data: StationWarnings;

  ngOnInit() {}
}
