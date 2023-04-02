import { AppComponent } from './app.component';
import { WorldMapComponent } from './world-map/world-map.component';
import { StationInfoComponent } from './station-info/station-info.component';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { StationListComponent } from './station-list/station-list.component';
import { StationDashboardComponent } from './station-dashboard/station-dashboard.component';
import { CustomSnackbarComponent } from './snackbar/custom-snackbar.component';
import { TooltipModule } from './tooltip-directive/tooltip-module';
import { WarningsFilterPipe } from './pipes/warnings-filter.pipe';
import { SignalsComponent } from './signals/signals.component';
import { SignalsPageComponent } from './signals-page/signals-page.component';
import { SettingsComponent } from './settings-page/settings-page.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBarModule,
} from '@angular/material/snack-bar';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    WorldMapComponent,
    StationInfoComponent,
    StationListComponent,
    StationDashboardComponent,
    CustomSnackbarComponent,
    WarningsFilterPipe,
    SignalsComponent,
    SignalsPageComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HighchartsChartModule,
    FormsModule,
    TooltipModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatIconModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatSnackBarModule,
    MatSliderModule,
    MatSelectModule,
  ],
  providers: [WarningsFilterPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
