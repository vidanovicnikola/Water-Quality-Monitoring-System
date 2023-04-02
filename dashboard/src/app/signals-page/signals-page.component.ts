import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, first, Subject } from 'rxjs';
import { DataService } from '../services/data.service';

export const FACTOR = 60;

@Component({
  selector: 'signals-page',
  templateUrl: './signals-page.component.html',
  styleUrls: ['./signals-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SignalsPageComponent implements OnInit, OnDestroy {
  signalName: string;
  charts: Highcharts.Options[];

  destroy$ = new Subject<void>();
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    if (!this.route.snapshot.routeConfig) {
      throw Error();
    }
    this.signalName = this.route.snapshot.routeConfig.path!;
  }

  loadData(event: { start: Date; end: Date; numberOfPoints: number }): void {
    this.dataService
      .getAllSignals(
        this.signalName,
        event.start,
        event.end,
        event.numberOfPoints
      )
      .pipe(first())
      .subscribe((data) => {
        this.charts = data;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
