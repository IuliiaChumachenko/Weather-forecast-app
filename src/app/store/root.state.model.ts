import { WeatherInfo } from "../classes/weather-info.class";

export const LOCATIONS: string[] = [
  'Kyiv, Ukraine',
  'Warsaw, Poland',
  'Sofia, Bulgaria',
  'Washington, USA',
  'Paris, France',
  'Rome, Italy',
  'Berlin, Germany',
  'London, United Kingdom'
];

export class RootStateModel {
  public location: string = "Unknown current location";
  public locations: string[] = LOCATIONS;
  public filteredLocations: string[] = LOCATIONS;
  public currentWeather!: WeatherInfo;
  public weatherForecast: WeatherInfo[] = [];
}
