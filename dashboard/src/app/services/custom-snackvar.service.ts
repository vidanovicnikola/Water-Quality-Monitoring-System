import { Injectable } from '@angular/core';
import { CustomSnackbarComponent } from '../snackbar/custom-snackbar.component';
import { StationWarnings } from '../model/station-warnings';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CustomSnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  public openSnackBar(data: StationWarnings[]) {
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      duration: 1000000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      data,
    });
  }

  public dismissOpenedSnackbar() {
    this.snackBar.dismiss();
  }
}
