import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { CustomSnackBarService } from '../services/custom-snackvar.service';
import { StationWarnings } from '../model/station-warnings';

@Component({
  selector: 'custom-snackbar',
  templateUrl: './custom-snackbar.component.html',
  styleUrls: ['./custom-snackbar.component.scss'],
})
export class CustomSnackbarComponent implements OnInit {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: StationWarnings[],
    private snackBar: CustomSnackBarService
  ) {}

  dismiss(): void {
    this.snackBar.dismissOpenedSnackbar();
  }

  ngOnInit() {}
}
