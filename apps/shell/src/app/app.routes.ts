import { Route } from '@angular/router';
import { loadRemoteModule } from '@nx/angular/mf';
import { HomeComponent } from './home/home.component';
import { BaseLayoutComponent } from './layout/base-layout/base-layout.component';
import { CanActivateUser } from './shared/guards/user.guard';

export const appRoutes: Route[] = [
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
    canActivate: [CanActivateUser],
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
    canActivate: [CanActivateUser],
    
  },
  {
    path: 'exercise-templates',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          loadRemoteModule('workout-exercise-templates', './routes').then(
            (m) => m.appRoutes
          ),
      },
    ],
    canActivate: [CanActivateUser],
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
    canActivate: [CanActivateUser],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
