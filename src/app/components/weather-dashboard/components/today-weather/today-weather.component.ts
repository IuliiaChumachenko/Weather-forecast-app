import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {WeatherCardComponent} from "../weather-card/weather-card.component";
import {GetWeatherDataService} from "../../../../services/get-weather-data.service";
import {Observable} from "rxjs";
import {WeatherInfo} from "../../../../classes/weather-info.class";
import {AsyncPipe, KeyValuePipe} from "@angular/common";
import {Select} from "@ngxs/store";
import {RootState} from "../../../../store/root.state";

@Component({
  selector: 'app-today-weather',
  standalone: true,
  imports: [MatCardModule, WeatherCardComponent, AsyncPipe, KeyValuePipe],
  templateUrl: './today-weather.component.html',
  styleUrl: './today-weather.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodayWeatherComponent {
  @Select(RootState.currentWeather) todayWeather$!: Observable<WeatherInfo>;
}
