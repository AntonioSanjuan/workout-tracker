import { Route } from '@angular/router';
import { loadRemoteModule } from '@nx/angular/mf';
import { HomeComponent } from './home/home.component';
import { BaseLayoutComponent } from './layout/base-layout/base-layout.component';

export const appRoutes: Route[] = [
  {
    path: 'workout-trainings',
    loadChildren: () =>
      loadRemoteModule('workout-trainings', './Routes').then(
        (m) => m.remoteRoutes
      ),
  },
  {
    path: 'account',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          loadRemoteModule('account', './routes').then((m) => m.appRoutes),
      },
    ],
    canActivate: [],
  },
  {
    path: 'trainings',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          loadRemoteModule('workout-trainings', './routes').then(
            (m) => m.appRoutes
          ),
      },
    ],
    canActivate: [],
  },
  {
    path: 'exercises',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          loadRemoteModule('workout-exercises', './routes').then(
            (m) => m.appRoutes
          ),
      },
    ],
    canActivate: [],
  },
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
