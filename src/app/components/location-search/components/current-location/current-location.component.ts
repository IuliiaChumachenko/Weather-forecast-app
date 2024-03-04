import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {Select, Store} from "@ngxs/store";
import {RootActions} from "../../../../store/root.actions";
import {RootState} from "../../../../store/root.state";

@Component({
  selector: 'app-current-location',
  standalone: true,
  imports: [MatIconModule, AsyncPipe],
  templateUrl: './current-location.component.html',
  styleUrl: './current-location.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentLocationComponent implements OnInit {
  @Select(RootState.location) location$!: Observable<string>;

  constructor(
    private readonly store: Store
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new RootActions.LoadLocationAndWeather());
  }
}
