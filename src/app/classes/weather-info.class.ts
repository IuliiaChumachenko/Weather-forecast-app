export class WeatherInfo {
  constructor (
    public degree: number,
    public state: string,
    public date: Date,
    public additionalInfo?: AdditionalWeatherInfo
  ) {}
}

export class AdditionalWeatherInfo {
  constructor (
    public realFeel: number,
    public humidity: number,
    public cloudCover: number,
    public visibility: number,
  ) {}
}
