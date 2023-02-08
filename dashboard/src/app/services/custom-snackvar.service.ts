import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from '../snackbar/custom-snackbar.component';
import { StationWarnings } from '../model/station-warnings';

@Injectable({
  providedIn: 'root',
})
export class CustomSnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  public openSnackBar(data: StationWarnings[]) {
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      duration: 1000000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      data,
    });
  }

  public dismissOpenedSnackbar() {
    this.snackBar.dismiss();
  }
}
