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
import { WorkoutTrainingExerciseResolver } from './shared/workout-training-exercise/workout-training-exercise.resolver';
import { TrainingExerciseEffects } from './workout-training-exercise/state/workout-training-exercise.effects';

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
        resolve: { list: WorkoutTrainingsListResolver },
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
            EffectsModule.forFeature([ExerciseTemplatesListEffects, TrainingEffects]),
            StoreModule.forFeature(EXERCISE_TEMPLATES_LIST_FEATURE_KEY, exerciseTemplatesListReducer),
            StoreModule.forFeature(fromWorkoutTrainings.WORKOUT_TRAININGS_FEATURE_KEY, fromWorkoutTrainings.workoutTrainingsReducer),
          )
        ],
        loadComponent: () =>
          import('./workout-training/workout-training.component').then((m) => m.WorkoutTrainingComponent),
      },
      {
        path: ':id/exercise/:exerciseId',
        resolve: { data: WorkoutTrainingExerciseResolver },
        providers: [
          importProvidersFrom(
            StoreModule.forFeature(fromWorkoutTrainings.WORKOUT_TRAININGS_FEATURE_KEY, fromWorkoutTrainings.workoutTrainingsReducer),
            EffectsModule.forFeature([TrainingExerciseEffects])
          )
        ],
        loadComponent: () =>
          import('./workout-training-exercise/workout-training-exercise.component').then((m) => m.WorkoutTrainingExerciseComponent),
      }
    ]

  },
];
