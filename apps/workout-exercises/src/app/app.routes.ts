import { Route } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import * as fromWorkoutExercises from './+state/workout-exercises.reducer';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app.component';
import { EffectsModule } from '@ngrx/effects'
import { WorkoutExerciseResolver } from './shared/workout-exercise/workout-exercise.resolver';
import { WorkoutExercisesListResolver } from './shared/workout-exercises-list/workout-exercises-list.resolver';
import { ExerciseEffects } from './workout-exercise/state/workout-exercise.effects';
import { WORKOUT_EXERCISE_TEMPLATES_FEATURE_KEY } from '@workout-tracker/shared-store';

export const appRoutes: Route[] = [
  {
    path: '',
    component: AppComponent,
    providers: [
      importProvidersFrom(
        StoreModule.forFeature(WORKOUT_EXERCISE_TEMPLATES_FEATURE_KEY, fromWorkoutExercises.workoutExercisesReducer)
        // StoreModule.forFeature(EXERCISE_TEMPLATES_FEATURE_KEY, exerciseTemplatesReducer),
        // StoreModule.forFeature(fromWorkoutExercises.WORKOUT_EXERCISES_FEATURE_KEY, fromWorkoutExercises.workoutExercisesReducer),
      )
    ],
    children: [
      {
        path: '',
        resolve: { data: WorkoutExercisesListResolver },
        providers: [
          importProvidersFrom()
        ],    
        loadComponent: () =>
          import('./workout-exercises-list/workout-exercises-list.component').then((m) => m.WorkoutExercisesListComponent),
      },
      {
        path: ':id',
        resolve: { data: WorkoutExerciseResolver },
        providers: [
          importProvidersFrom(
            EffectsModule.forFeature([ExerciseEffects])
          )
        ],    
        loadComponent: () =>
          import('./workout-exercise/workout-exercise.component').then((m) => m.WorkoutExerciseComponent),
      }
    ]

  },
];
