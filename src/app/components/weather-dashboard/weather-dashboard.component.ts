import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatTabsModule} from "@angular/material/tabs";
import {MatBadgeModule} from "@angular/material/badge";

@Component({
  selector: 'app-weather-dashboard',
  standalone: true,
  imports: [RouterOutlet, MatTabsModule, MatBadgeModule, RouterLink],
  templateUrl: './weather-dashboard.component.html',
  styleUrl: './weather-dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherDashboardComponent {
  navLinks = [
    {
      label: 'Weather',
      link: '/weather',
      index: 0
    }, {
      label: 'Alerts',
      link: '/weather',
      isBadge: true,
      index: 1
    }, {
      label: 'Map',
      link: '/weather',
      index: 2
    }, {
      label: 'Satellite',
      link: '/weather',
      index: 3
    }, {
      label: 'News',
      link: '/weather',
      index: 4
    },
  ];

  activeLink = this.navLinks[0];

}
