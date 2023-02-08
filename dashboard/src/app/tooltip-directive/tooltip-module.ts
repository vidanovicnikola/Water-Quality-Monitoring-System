import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StationTooltipComponent } from './station-tooltip.component';
import { StationTooltipDirective } from './station-tooltop.directive';
import { MatIconModule } from '@angular/material/icon';
import { StationWarningsComponent } from './station-warnings/station-warnings.component';

@NgModule({
  declarations: [
    StationTooltipComponent,
    StationTooltipDirective,
    StationWarningsComponent,
  ],
  imports: [CommonModule, MatIconModule],
  exports: [StationTooltipDirective, StationWarningsComponent],
})
export class TooltipModule {}
