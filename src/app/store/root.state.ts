import {RootStateModel} from "./root.state.model";
import {Action, Selector, State, StateContext, Store} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {RootActions} from "./root.actions";
import {Observable, tap, zip} from "rxjs";
import {GetLocationDataService} from "../services/get-location-data.service";
import {GetWeatherDataService} from "../services/get-weather-data.service";
import {IpInfo} from "../interfaces/ip-info.interface";
import {CurrentWeather} from "../interfaces/current-weather.interface";
import {WeatherForecast} from "../interfaces/forecast-weather.interface";
import {WeatherInfo} from "../classes/weather-info.class";
import {GeoNamesResponse} from "../interfaces/geo-name.interface";

@State<RootStateModel>({
  name: "RootState",
  defaults: new RootStateModel()
})
@Injectable()
export class RootState {
  constructor(
    private readonly getLocationDataService: GetLocationDataService,
    private readonly getWeatherDataService: GetWeatherDataService
  ) {
  }

  @Selector()
  public static location(state: RootStateModel): string {
    return state.location;
  }

  @Selector()
  public static filteredLocations(state: RootStateModel): string[] {
    return state.filteredLocations;
  }

  @Selector()
  public static currentWeather(state: RootStateModel): WeatherInfo {
    return state.currentWeather;
  }

  @Selector()
  public static weatherForecast(state: RootStateModel): WeatherInfo[] {
    return state.weatherForecast;
  }


  @Action(RootActions.LoadLocationAndWeather)
  public loadLocationAndWeather(ctx: StateContext<RootStateModel>): Observable<any> {
    return this.getLocationDataService.getCurrentLocation()
      .pipe(
        tap(({country, city, latitude, longitude}: IpInfo) => {
          ctx.patchState({location: this.getLocationDataService.getMappedLocation(city, country)});

          return ctx.dispatch(new RootActions.LoadWeather({lat: latitude, lon: longitude}));
        })
      );
  }

  @Action(RootActions.LoadPlaceByGeodata)
  public loadPlaceByGeodata(ctx: StateContext<RootStateModel>, {lat, lon}: RootActions.LoadPlaceByGeodata): Observable<any> {
    return this.getLocationDataService.getPlaceNameByGeodata(lat, lon)
      .pipe(
        tap(({ geonames }: GeoNamesResponse) => {
          const location = this.getLocationDataService.getMappedLocation(geonames[0].name, geonames[0].countryName);

          ctx.patchState({location: location} );
        })
      );
  }

  @Action(RootActions.LoadWeather)
  public loadWeather(ctx: StateContext<RootStateModel>, { params }: RootActions.LoadWeather): Observable<any>  {
    const {lat, lon, city} = params;

    return zip(
      this.getWeatherDataService.getCurrentWeather(lat, lon, city),
      this.getWeatherDataService.getFiveDaysWeatherForecast(lat, lon, city)
    ).pipe(
      tap(([currentWeather, {list}]: [CurrentWeather, WeatherForecast]) => {
        const current = this.getWeatherDataService.getMappedWeatherInfo(currentWeather);
        const weatherForecast = this.getWeatherDataService.getMappedForecast(list);

        ctx.patchState({
          currentWeather: current,
          weatherForecast
        });

        if (city) {
          const {coord: {lat, lon}} = currentWeather;

          ctx.dispatch(new RootActions.LoadPlaceByGeodata(lat, lon))
        }
      })
    )
  }

  @Action(RootActions.SearchLocation)
  public searchLocation(ctx: StateContext<RootStateModel>, {searchStr}: RootActions.SearchLocation): void  {
    const { locations } = ctx.getState();

    ctx.patchState({
      filteredLocations: this.getLocationDataService.filterLocations(locations, searchStr)
    });
  }

  @Action(RootActions.UpdateLocations)
  public updateLocation(ctx: StateContext<RootStateModel>, {location}: RootActions.UpdateLocations): void  {
    const { locations } = ctx.getState();

    if (!locations.find(loc => loc.toLowerCase().includes(location.toLowerCase()))) {
      ctx.patchState({
        locations: [...locations, location]
      });
    }
  }

}
