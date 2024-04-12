import { Route } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app.component';
import { EffectsModule } from '@ngrx/effects'
import * as fromWorkoutTrainings from './+state/workout-trainings.reducer';
import { WorkoutTrainingsListResolver } from './shared/workout-trainings-list/workout-trainings-list.resolver';
import { TRAININGS_HUB_FEATURE_KEY } from '@workout-tracker/shared-store';
import { TrainingEffects } from './workout-training/state/workout-training.effects';
import { WorkoutTrainingResolver } from './shared/workout-training/workout-training.resolver';

export const appRoutes: Route[] = [
  {
    path: '',
    component: AppComponent,
    providers: [
      importProvidersFrom(
        StoreModule.forFeature(TRAININGS_HUB_FEATURE_KEY, fromWorkoutTrainings.workoutTrainingsReducer)
        // StoreModule.forFeature(TRAININGS_FEATURE_KEY, trainingsReducer),
        // StoreModule.forFeature(fromWorkoutTrainings.WORKOUT_TRAININGS_FEATURE_KEY, fromWorkoutTrainings.workoutTrainingsReducer),
      )
    ],
    children: [
      {
        path: '',
        resolve: { data: WorkoutTrainingsListResolver },
        providers: [
          importProvidersFrom()
        ],    
        loadComponent: () =>
          import('./workout-trainings-list/workout-trainings-list.component').then((m) => m.WorkoutTrainingsListComponent),
      },
      {
        path: ':id',
        resolve: { data: WorkoutTrainingResolver },
        providers: [
          importProvidersFrom(
            EffectsModule.forFeature([TrainingEffects])
          )
        ],    
        loadComponent: () =>
          import('./workout-training/workout-training.component').then((m) => m.WorkoutTrainingComponent),
      }
    ]

  },
];
