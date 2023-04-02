import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { finalize, first } from 'rxjs';
import { Station } from '../model/station';

export const FACTOR = 60;

@Component({
  selector: 'station-info',
  templateUrl: './station-info.component.html',
  styleUrls: ['./station-info.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StationInfoComponent implements OnInit {
  stationInfo: Station;

  stationId: string;

  charts: Highcharts.Options[];
  // stationInfoLoading: boolean;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.stationId = this.route.snapshot.paramMap.get('Id') as string;

    // this.stationInfoLoading = true;
    this.dataService
      .getStationInfo(this.stationId)
      // .pipe(finalize(() => (this.stationInfoLoading = false)))
      .subscribe((stations) => {
        this.stationInfo = stations[0];
      });
  }

  loadData(event: { start: Date; end: Date; numberOfPoints: number }): void {
    this.dataService
      .getSignalsForStation(
        this.stationId as string,
        event.start,
        event.end,
        event.numberOfPoints
      )
      .pipe(first())
      .subscribe((data) => {
        this.charts = data;
      });
  }
}
