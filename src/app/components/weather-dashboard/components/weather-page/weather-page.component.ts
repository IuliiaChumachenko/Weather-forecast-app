import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TodayWeatherComponent} from "../today-weather/today-weather.component";
import {WeatherForecastComponent} from "../weather-forecast/weather-forecast.component";

@Component({
  selector: 'app-weather-page',
  standalone: true,
  imports: [TodayWeatherComponent, WeatherForecastComponent],
  templateUrl: './weather-page.component.html',
  styleUrl: './weather-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherPageComponent {

}
