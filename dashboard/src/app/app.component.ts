import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { Marker } from './model/marker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {}
  title = 'dashboard';
}
