import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { ExtendedWarning, Warning, warningMessageMap } from '../model/warning';
import { Station } from '../model/station';
import { CustomSnackBarService } from '../services/custom-snackvar.service';
import {
  WARNINGS_KEY,
  LocalStorageService,
} from '../services/local-storage.service';
import { WarningsFilterPipe } from '../pipes/warnings-filter.pipe';
import { StationWarnings } from '../model/station-warnings';

@Component({
  selector: 'world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.scss'],
})
export class WorldMapComponent implements OnInit {
  markers: Station[] = [];
  markerAnimation = google.maps.Animation;
  warnings: Warning[] = [];
  extendedWarnings: ExtendedWarning[] = [];

  constructor(
    private dataService: DataService,
    private router: Router,
    private snackBar: CustomSnackBarService,
    private localStorageService: LocalStorageService,
    private warningsFilter: WarningsFilterPipe
  ) {}

  ngOnInit(): void {
    const eventSource = new EventSource(
      'http://localhost:3000/WaterQuality/sse'
    );
    eventSource.onmessage = ({ data }) => {
      let newWarnings = JSON.parse(data) as Warning[];
      this.handleWarningMessages(newWarnings);
    };

    this.dataService.getAllStations().subscribe((stations) => {
      this.markers = stations;
      this.markers = this.updateMarkers(
        this.warnings,
        this.markerAnimation.DROP
      );
      this.openSnackBar();
    });
  }

  handleWarningMessages(data: Warning[]) {
    if (data.length == 0) {
      data = this.localStorageService.getData(WARNINGS_KEY) as Warning[];
    }
    this.warnings = data;
    this.extendedWarnings = data.map(
      (x) => ({ ...x, ...warningMessageMap.get(x.signal) } as ExtendedWarning)
    );

    if (this.markers == null || this.markers.length == 0) {
      return;
    }

    this.openSnackBar();

    this.markers = this.updateMarkers(data, null);
    this.localStorageService.saveData(WARNINGS_KEY, data);
  }

  openSnackBar(): void {
    const affectedStations = [
      ...new Set(this.warnings.map((x) => x.stationId)),
    ];
    const snackBarData = affectedStations.map(
      (x) =>
        ({
          station: this.markers.find((m) => m.station_id == x),
          warnings: this.warningsFilter.transform(this.extendedWarnings, x),
        } as StationWarnings)
    );
    this.snackBar.openSnackBar(snackBarData);
  }

  updateMarkers(
    warnings: Warning[],
    defaultAnimation: google.maps.Animation | null
  ): Station[] {
    const updatedMarkers: Station[] = [...this.markers].map((x) => ({
      ...x,
      animation: defaultAnimation,
    }));

    warnings.forEach((warning) => {
      const marker = updatedMarkers.find(
        (x) => x.station_id == warning.stationId
      );
      if (marker) {
        marker.animation = this.markerAnimation.BOUNCE;
      }
    });

    return updatedMarkers;
  }

  onMarkerClick(stationId: string): void {
    this.router.navigate([`/station/${stationId}`]);
  }
}
