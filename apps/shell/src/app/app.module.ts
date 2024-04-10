import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { reducers, rootInitialState } from './store/reducers';
import { LayoutEffects,RouterEffects, RequestEffects, UiEffects, UserEffects, ErrorMessageEffects, SettingsEffects, ExerciseTemplatesListEffects, TrainingsEffects } from '@workout-tracker/shared-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BaseLayoutComponent } from './layout/base-layout/base-layout.component';
import { CoreModule } from './core/core.module';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { LibsServicesCultureModule } from '@workout-tracker/services/culture';
import { LibsServicesMessageModule } from '@workout-tracker/services/message';
import { LibsServicesUserSettingsModule } from '@workout-tracker/services/user-settings';
import { LibsServicesApiModule } from '@workout-tracker/services/api';
import { LibsServicesAuthModule } from '@workout-tracker/services/auth';
import { LibsServicesDialogModule } from '@workout-tracker/services/dialog';
import { LibsServicesExerciseTemplatesModule } from '@workout-tracker/services/exercise-templates';
import { LibsServicesTrainingsModule } from '@workout-tracker/services/trainings';
import { CanActivateUser } from './shared/guards/user.guard';


@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    LibsServicesCultureModule,
    LibsServicesAuthModule,
    LibsServicesApiModule,
    LibsServicesMessageModule,
    LibsServicesDialogModule,
    LibsServicesExerciseTemplatesModule,
    LibsServicesTrainingsModule,
    LibsServicesUserSettingsModule,
    CoreModule,
    BaseLayoutComponent,
    LoadingSpinnerComponent,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    StoreModule.forRoot(reducers, {
        initialState: rootInitialState,
        metaReducers: [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([
      UiEffects, 
      RequestEffects, 
      LayoutEffects, 
      RouterEffects,
      UserEffects,
      SettingsEffects,
      ExerciseTemplatesListEffects,
      TrainingsEffects,
      ErrorMessageEffects
    ]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({ logOnly: !isDevMode() }),
  ],
  providers: [
    CanActivateUser
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
