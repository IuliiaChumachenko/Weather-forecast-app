import {CurrentWeather} from "./current-weather.interface";

export interface WeatherForecast {
  cod: string;
  message: number;
  cnt: number;
  list: CurrentWeather[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}
