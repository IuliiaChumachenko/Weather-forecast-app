import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {DatePipe} from "@angular/common";
import {WeatherInfo} from "../../../../classes/weather-info.class";
import {CamelCaseToTextPipe} from "../../../../pipes/camel-case-to-text.pipe";

@Component({
  selector: 'app-weather-card',
  standalone: true,
  imports: [DatePipe, CamelCaseToTextPipe],
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherCardComponent {

  @Input() todayWeather!: WeatherInfo | null;

}
