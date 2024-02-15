import { Route } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import * as fromAccount from './+state/account.reducer';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app.component';
import { EffectsModule } from '@ngrx/effects'

export const appRoutes: Route[] = [
  {
    path: '',
    component: AppComponent,
    providers: [
      importProvidersFrom(
        StoreModule.forFeature(fromAccount.ACCOUNT_FEATURE_KEY, fromAccount.accountReducer),
      )
    ],
    children: [
      {
        path: 'login',
        providers: [
          importProvidersFrom(
            EffectsModule.forFeature([])
          )
        ],    
        loadComponent: () =>
          import('./login/login.component').then((m) => m.LoginComponent),
      },
      {
        path: 'signUp',
        providers: [
          importProvidersFrom(
            EffectsModule.forFeature([])
          )
        ],    
        loadComponent: () =>
          import('./sign-up/sign-up.component').then((m) => m.SignUpComponent),
      },
      {
        path: 'settings',
        providers: [
          importProvidersFrom(
            EffectsModule.forFeature([])
          )
        ],    
        loadComponent: () =>
          import('./settings/settings.component').then((m) => m.SettingsComponent),
      }
    ]

  },
];
