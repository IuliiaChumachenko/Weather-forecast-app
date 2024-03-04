import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {CurrentWeather} from "../interfaces/current-weather.interface";
import {WeatherForecast} from "../interfaces/forecast-weather.interface";
import {AdditionalWeatherInfo, WeatherInfo} from "../classes/weather-info.class";

@Injectable({
  providedIn: 'root'
})
export class GetWeatherDataService {
  private readonly BASE_URL: string = "https://api.openweathermap.org"
  private readonly API_KEY: string = '6b5a70d801d8aa6222ff9a1997968f68';

  constructor(private readonly apiService: ApiService) { }

  getCurrentWeather(lat: number, lon: number, city?: string): Observable<CurrentWeather> {
    const url = `${this.BASE_URL}/data/2.5/weather`;
    const params = this.getWeatherRequestParams(lat, lon, city);

    return this.apiService.get<CurrentWeather>(url, params);
  }

  getFiveDaysWeatherForecast(lat: number, lon: number, city?: string): Observable<WeatherForecast> {
    const url = `${this.BASE_URL}/data/2.5/forecast`;
    const params = this.getWeatherRequestParams(lat, lon, city);

    return this.apiService.get<WeatherForecast>(url, params);
  }

 getMappedWeatherInfo({main, weather, clouds, visibility, dt_txt}: CurrentWeather): WeatherInfo {
    const {feels_like, humidity, temp} = main;
    const state = weather[0].main;
    const additionalInfo = new AdditionalWeatherInfo(Math.round(feels_like), humidity, clouds.all, visibility);
    const weatherDate = dt_txt ? new Date(dt_txt) : new Date;

    return  new WeatherInfo(Math.round(temp), state, weatherDate, additionalInfo);
  }

  getMappedForecast(forecastList: CurrentWeather[]): WeatherInfo[] {
    const displayedData = forecastList.filter(({ dt_txt }) => dt_txt?.includes('12:00:00')).slice(1);
    return displayedData.map(forecast => this.getMappedWeatherInfo(forecast));
  }

  private getWeatherRequestParams(lat: number, lon: number, city?: string): HttpParams {
    let params: HttpParams = new HttpParams()
      .set('appid', this.API_KEY)
      .set('units', 'metric');

    if (lat) {
      params = params.set('lat', lat);
    }

    if (lat) {
      params = params.set('lon', lon);
    }

    if (city) {
      params = params.set('q', city);
    }

    return params;
  }
}
