import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Observable, startWith} from "rxjs";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {AsyncPipe} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {Select, Store} from "@ngxs/store";
import {RootActions} from "../../../../store/root.actions";
import {RootState} from "../../../../store/root.state";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: 'app-current-location-search-field',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatIconModule
  ],
  templateUrl: './location-search-field.component.html',
  styleUrl: './location-search-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationSearchFieldComponent implements OnInit {
  @Select(RootState.filteredLocations) filteredLocations$!: Observable<string[]>;

  searchFieldControl = new FormControl('');

  constructor(
    private readonly store: Store
  ) {
  }

  ngOnInit() {
    this.searchFieldControl.valueChanges
      .pipe(
        untilDestroyed(this),
        startWith('')
      ).subscribe(value => {
        this.store.dispatch(new RootActions.SearchLocation(value as string));
      });
  }

  onKeydown(target: any): void {
    const location = target?.value;

    this.store.dispatch(new RootActions.UpdateLocations(location));
    this.loadWeather(location);
  }

  loadWeather(city: any): void {
    this.store.dispatch(new RootActions.LoadWeather({city}));

  }

  getCurrentLocationInfo(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
        this.store.dispatch(new RootActions.LoadPlaceByGeodata(latitude, longitude));
        this.store.dispatch(new RootActions.LoadWeather({lat: latitude, lon: longitude}));
      },
        () => this.store.dispatch(new RootActions.LoadLocationAndWeather()));
    }
  }
}
