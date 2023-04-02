import { Component, OnInit } from '@angular/core';
import { AppConfig, SignalSettings } from '../model/app-config';
import { DataService } from '../services/data.service';
import { finalize } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
})
export class SettingsComponent implements OnInit {
  config: AppConfig;
  configCopy: AppConfig;
  allSignals: string[];
  availableSignals: string[] = [];

  constructor(
    private dataService: DataService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.dataService.getAppConfig().subscribe((data) => {
      this.setConfigAndCopy(data);
    });

    this.dataService.getAllSignalNames().subscribe((data) => {
      this.allSignals = data;
      this.setAvailableSignals();
    });
  }

  onAddSignalSettings(): void {
    const newSignal = {
      name: '',
      displayRange: { from: 0, to: 50 },
      optimalRange: { from: null, to: null },
    };
    this.config.signals.push(newSignal as SignalSettings);
    this.setAvailableSignals();
  }

  onSaveClick(): void {
    const dataToSave: AppConfig = {
      ...this.config,
      signals: this.config.signals.filter(
        (x) => x.name != '' && x.name != null
      ),
    };

    this.dataService.saveAppConfig(dataToSave).subscribe((savedData) => {
      this.setConfigAndCopy(savedData);
      this.snackBar.open('Settings saved successfully', undefined, {
        duration: 1000,
      });
    });
  }

  setConfigAndCopy(config: AppConfig): void {
    this.config = config;
    this.configCopy = structuredClone(this.config);
  }

  setAvailableSignals(): void {
    const signalsWithSettings = this.config.signals.map((x) => x.name);
    this.availableSignals = this.allSignals.filter(
      (s) => !signalsWithSettings.includes(s)
    );
  }
}
