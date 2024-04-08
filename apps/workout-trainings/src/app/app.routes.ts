import { Route } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app.component';
import { EffectsModule } from '@ngrx/effects'
import * as fromWorkoutTrainings from './+state/workout-trainings.reducer';
import { WorkoutTrainingsListResolver } from './shared/workout-trainings-list/workout-trainings-list.resolver';

export const appRoutes: Route[] = [
  {
    path: '',
    component: AppComponent,
    providers: [
      importProvidersFrom(
        StoreModule.forFeature(fromWorkoutTrainings.WORKOUT_TRAININGS_FEATURE_KEY, fromWorkoutTrainings.workoutTrainingsReducer),
      )
    ],
    children: [
      {
        path: '',
        resolve: { data: WorkoutTrainingsListResolver },
        providers: [
          importProvidersFrom(
          )
        ],    
        loadComponent: () =>
          import('./workout-trainings-list/workout-trainings-list.component').then((m) => m.WorkoutTrainingsListComponent),
      },
    ]

  },
];
