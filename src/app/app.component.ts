import {ChangeDetectionStrategy, Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LocationSearchComponent} from "./components/location-search/location-search.component";
import {WeatherDashboardComponent} from "./components/weather-dashboard/weather-dashboard.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LocationSearchComponent, WeatherDashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public title = 'weather-forecast-app';
}
