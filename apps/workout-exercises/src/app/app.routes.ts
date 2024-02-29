import { Route } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import * as fromWorkoutExercises from './+state/workout-exercises.reducer';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app.component';
import { EffectsModule } from '@ngrx/effects'
import { WorkoutExercisesListResolver } from './shared/workout-exercises-list/workout-exercises-list.resolver';
import { WorkoutExerciseDetailsResolver } from './shared/workout-exercise-details/workout-exercise-details.resolver';
import { ExerciseDetailsEffects } from './workout-exercise-details/state/workout-exercise-details.effects';
import { ExercisesEffects } from '@workout-tracker/shared-store';
import { LibsServicesExercisesModule } from '@workout-tracker/services/exercises';

export const appRoutes: Route[] = [
  {
    path: '',
    component: AppComponent,
    providers: [
      importProvidersFrom(
        StoreModule.forFeature(fromWorkoutExercises.WORKOUT_EXERCISES_FEATURE_KEY, fromWorkoutExercises.workoutExercisesReducer),
      )
    ],
    children: [
      {
        path: '',
        resolve: { data: WorkoutExercisesListResolver },
        providers: [
          importProvidersFrom(
          )
        ],    
        loadComponent: () =>
          import('./workout-exercises-list/workout-exercises-list.component').then((m) => m.WorkoutExercisesListComponent),
      },
      {
        path: ':id',
        resolve: { data: WorkoutExerciseDetailsResolver },
        providers: [
          importProvidersFrom(
            EffectsModule.forFeature([ExerciseDetailsEffects])
          )
        ],    
        loadComponent: () =>
          import('./workout-exercise-details/workout-exercise-details.component').then((m) => m.WorkoutExerciseDetailsComponent),
      }
    ]

  },
];
