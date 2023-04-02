import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, fromEvent, Subject, takeUntil } from 'rxjs';
import * as Highcharts from 'highcharts';

export const FACTOR = 60;

@Component({
  selector: 'signals',
  templateUrl: './signals.component.html',
  styleUrls: ['./signals.component.scss'],
})
export class SignalsComponent implements OnInit, OnDestroy {
  @Input() charts: Highcharts.Options[];
  @Output() loadData = new EventEmitter<{
    start: Date;
    end: Date;
    numberOfPoints: number;
  }>();

  startDate: Date = new Date();
  endDate: Date = new Date();
  Highcharts = Highcharts;

  destroy$ = new Subject<void>();
  constructor(private route: ActivatedRoute) {}

  load(): void {
    const numberOfPoints = Math.round(window.innerWidth / FACTOR);

    const start = new Date(this.startDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setDate(this.endDate.getDate() + 1);
    end.setHours(0, 0, 0, 0);

    this.loadData.emit({ start, end, numberOfPoints });
  }

  ngOnInit(): void {
    this.startDate.setDate(this.endDate.getDate() - 5);
    this.load();

    fromEvent(window, 'resize')
      .pipe(debounceTime(300), takeUntil(this.destroy$))
      .subscribe((evt: any) => {
        this.load();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
