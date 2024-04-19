import { Route } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app.component';
import { EffectsModule } from '@ngrx/effects'
import * as fromWorkoutTrainings from './+state/workout-trainings.reducer';
import { WorkoutTrainingsListResolver } from './shared/workout-trainings-list/workout-trainings-list.resolver';
import { EXERCISE_TEMPLATES_LIST_FEATURE_KEY, ExerciseTemplatesListEffects, TRAININGS_LIST_FEATURE_KEY, TrainingsListEffects, exerciseTemplatesListReducer, trainingsListReducer } from '@workout-tracker/shared-store';
import { TrainingEffects } from './workout-training/state/workout-training.effects';
import { WorkoutTrainingResolver } from './shared/workout-training/workout-training.resolver';

export const appRoutes: Route[] = [
  {
    path: '',
    component: AppComponent,
    providers: [
      importProvidersFrom(
        StoreModule.forFeature(TRAININGS_LIST_FEATURE_KEY, trainingsListReducer),
        EffectsModule.forFeature([TrainingsListEffects])
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
            StoreModule.forFeature(EXERCISE_TEMPLATES_LIST_FEATURE_KEY, exerciseTemplatesListReducer),
            StoreModule.forFeature(fromWorkoutTrainings.WORKOUT_TRAININGS_FEATURE_KEY, fromWorkoutTrainings.workoutTrainingsReducer),
            EffectsModule.forFeature([ExerciseTemplatesListEffects, TrainingEffects])
          )
        ],    
        loadComponent: () =>
          import('./workout-training/workout-training.component').then((m) => m.WorkoutTrainingComponent),
      }
    ]

  },
];
