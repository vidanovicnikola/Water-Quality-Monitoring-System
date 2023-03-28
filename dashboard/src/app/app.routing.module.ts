import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings-page/settings-page.component';
import { SignalsPageComponent } from './signals-page/signals-page.component';
import { StationInfoComponent } from './station-info/station-info.component';
import { StationListComponent } from './station-list/station-list.component';
import { WorldMapComponent } from './world-map/world-map.component';

const routes: Routes = [
  { path: '', component: WorldMapComponent },
  { path: 'station/:Id', component: StationInfoComponent },
  { path: 'stations', component: StationListComponent },
  { path: 'dewpoint_temp_degc', component: SignalsPageComponent },
  { path: 'significant_wave_height_m', component: SignalsPageComponent },
  { path: 'wind_speed_mps', component: SignalsPageComponent },
  { path: 'settings', component: SettingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
