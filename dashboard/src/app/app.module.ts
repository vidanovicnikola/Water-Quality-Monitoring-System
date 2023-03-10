import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { WorldMapComponent } from './world-map/world-map.component';
import { AppRoutingModule } from './app.routing.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { StationInfoComponent } from './station-info/station-info.component';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { StationListComponent } from './station-list/station-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StationDashboardComponent } from './station-dashboard/station-dashboard.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from './snackbar/custom-snackbar.component';
import { TooltipModule } from './tooltip-directive/tooltip-module';
import { WarningsFilterPipe } from './pipes/warnings-filter.pipe';
import { SignalsComponent } from './signals/signals.component';
import { SignalsPageComponent } from './signals-page/signals-page.component';

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
  ],
  providers: [WarningsFilterPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
