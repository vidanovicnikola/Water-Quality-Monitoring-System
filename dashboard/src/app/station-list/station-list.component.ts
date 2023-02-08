import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Station } from '../model/station';

@Component({
  selector: 'station-list',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class StationListComponent implements OnInit {
  stations: Station[];
  columnsToDisplay = ['id', 'name', 'owner'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Station | null;

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.dataService.getAllStations().subscribe((data) => {
      this.stations = data;
    });
  }

  navigateToStation(stationId: string): void {
    this.router.navigate([`/station/${stationId}`]);
  }
}
