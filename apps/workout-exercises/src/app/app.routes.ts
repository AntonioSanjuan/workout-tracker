import { Route } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import * as fromWorkoutExercises from './+state/workout-exercises.reducer';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app.component';
import { EffectsModule } from '@ngrx/effects'

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
        providers: [
          importProvidersFrom(
            EffectsModule.forFeature([])
          )
        ],    
        loadComponent: () =>
          import('./workout-exercises-list/workout-exercises-list.component').then((m) => m.WorkoutExercisesListComponent),
      }
    ]

  },
];
