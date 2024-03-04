import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CurrentLocationComponent} from "./components/current-location/current-location.component";
import {TitleCasePipe} from "@angular/common";
import {LocationSearchFieldComponent} from "./components/location-search-field/location-search-field.component";

@Component({
  selector: 'app-location-search',
  standalone: true,
  imports: [CurrentLocationComponent, LocationSearchFieldComponent, TitleCasePipe],
  templateUrl: './location-search.component.html',
  styleUrl: './location-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationSearchComponent {
  contentTitle = "The only weather forecast you need";
}
