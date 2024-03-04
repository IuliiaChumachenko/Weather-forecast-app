import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {IpInfo} from "../interfaces/ip-info.interface";
import {GeoNamesResponse} from "../interfaces/geo-name.interface";

@Injectable({
  providedIn: 'root'
})
export class GetLocationDataService {
  IP_LOCATION_URL = "https://ipwho.is/";
  GET_LOCATION_URL = "http://api.geonames.org";

  constructor(private readonly apiService: ApiService) { }

  getCurrentLocation(): Observable<IpInfo> {
    return this.apiService.get<IpInfo>(this.IP_LOCATION_URL);
  }

  getPlaceNameByGeodata(lat: number, lng: number): Observable<GeoNamesResponse> {
    return this.apiService.get<GeoNamesResponse>(`${this.GET_LOCATION_URL}/findNearbyPlaceNameJSON?lat=${lat}&lng=${lng}&username=yulya`);
  }

  getMappedLocation(city: string, country: string): string {
    return`${city}, ${country}`;
  }

  filterLocations(options: string[], value: string = ""): string[] {
    const filterValue = value.toLowerCase();

    return options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
