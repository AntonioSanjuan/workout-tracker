import { Route } from '@angular/router';
import { loadRemoteModule } from '@nx/angular/mf';
import { HomeComponent } from './home/home.component';

export const appRoutes: Route[] = [
  {
    path: 'account',
    loadChildren: () =>
      loadRemoteModule('account', './Routes').then((m) => m.remoteRoutes),
  },
  {
    path: '',
    component: HomeComponent,
  },
];
