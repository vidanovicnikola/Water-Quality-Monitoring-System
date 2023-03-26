import {
  Controller,
  Get,
  HttpService,
  ParseIntPipe,
  Query,
  Sse,
} from '@nestjs/common';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ImportDataService } from 'src/services/import-data.service';
import { WaterQualityService } from 'src/services/water-quality.service';

@Controller('WaterQuality')
export class WaterQualityController {
  constructor(
    private waterQualityService: WaterQualityService,
    private importDataService: ImportDataService,
  ) {}

  @Get('Signals')
  getSignalsForStation(
    @Query('id') id: string,
    @Query('start') start: string,
    @Query('end') end: string,
    @Query('numberOfPoints', ParseIntPipe) numberOfPoints: number,
  ) {
    return this.waterQualityService.getSignalsForStation(
      id,
      new Date(start),
      new Date(end),
      numberOfPoints,
    );
  }

  @Get('SignalData')
  getAllSignals(
    @Query('signalName') signalName: string,
    @Query('start') start: string,
    @Query('end') end: string,
    @Query('numberOfPoints', ParseIntPipe) numberOfPoints: number,
  ) {
    return this.waterQualityService.getAllSignals(
      signalName,
      new Date(start),
      new Date(end),
      numberOfPoints,
    );
  }

  @Get('Station')
  getStationInfo(@Query('id') id: string) {
    return this.waterQualityService.getStationInfo(id);
  }

  @Get('AllStations')
  getAllStations() {
    return this.waterQualityService.getAllStations();
  }

  @Sse('Warnings')
  alertUser(): Observable<MessageEvent> {
    return this.importDataService.alertUser$.pipe(
      map((data) => ({ data } as MessageEvent)),
    );
  }
}
