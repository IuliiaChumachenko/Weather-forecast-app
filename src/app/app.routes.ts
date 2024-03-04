import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'apps',
    pathMatch: 'full',
  },
  {
    path: "weather", loadComponent: () => import("./components/weather-dashboard/components/weather-page/weather-page.component")
      .then((m) => m.WeatherPageComponent),
  },
  {
    path: '**',
    redirectTo: 'alerts',
  }
];
