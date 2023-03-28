import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
})
export class SettingsComponent implements OnInit {
  signalsValueRanges: { signal: string; min: number; max: number }[];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService
      .getSignalsRange()
      .subscribe((data) => (this.signalsValueRanges = data?.normalValues));
  }
}
