import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {WeatherCardComponent} from "../weather-card/weather-card.component";
import {Observable} from "rxjs";
import {WeatherInfo} from "../../../../classes/weather-info.class";
import {AsyncPipe} from "@angular/common";
import {CarouselModule} from "primeng/carousel";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {Select} from "@ngxs/store";
import {RootState} from "../../../../store/root.state";

@UntilDestroy()
@Component({
  selector: 'app-weather-forecast',
  standalone: true,
  imports: [CarouselModule, WeatherCardComponent, AsyncPipe],
  templateUrl: './weather-forecast.component.html',
  styleUrl: './weather-forecast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherForecastComponent implements OnInit {
  @Select(RootState.weatherForecast) weatherForecast$!: Observable<WeatherInfo[]>;

  weatherForecast: WeatherInfo[] = [];

  constructor(
    private readonly cd: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.weatherForecast$
      .pipe(untilDestroyed(this))
      .subscribe(item => {
        this.weatherForecast = item as any[];
        this.cd.markForCheck();
      });
  }
}
