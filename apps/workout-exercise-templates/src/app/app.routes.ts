import { Route } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import * as fromWorkoutExercises from './+state/workout-exercise-templates.reducer';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app.component';
import { EffectsModule } from '@ngrx/effects'
import { WorkoutExerciseTemplateResolver } from './shared/workout-exercise-template/workout-exercise-template.resolver';
import { WorkoutExerciseTemplatesListResolver } from './shared/workout-exercise-templates-list/workout-exercise-templates-list.resolver';
import { WorkoutExerciseTemplatesEffects } from './workout-exercise-template/state/workout-exercise-template.effects';
import { EXERCISE_TEMPLATES_HUB_FEATURE_KEY } from '@workout-tracker/shared-store';

export const appRoutes: Route[] = [
  {
    path: '',
    component: AppComponent,
    providers: [
      importProvidersFrom(
        StoreModule.forFeature(EXERCISE_TEMPLATES_HUB_FEATURE_KEY, fromWorkoutExercises.workoutExerciseTemplatesReducer)
        // StoreModule.forFeature(EXERCISE_TEMPLATES_FEATURE_KEY, exerciseTemplatesReducer),
        // StoreModule.forFeature(fromWorkoutExercises.WORKOUT_EXERCISES_FEATURE_KEY, fromWorkoutExercises.workoutExercisesReducer),
      )
    ],
    children: [
      {
        path: '',
        resolve: { data: WorkoutExerciseTemplatesListResolver },
        providers: [
          importProvidersFrom()
        ],    
        loadComponent: () =>
          import('./workout-exercise-templates-list/workout-exercise-templates-list.component').then((m) => m.WorkoutExerciseTemplatesListComponent),
      },
      {
        path: ':id',
        resolve: { data: WorkoutExerciseTemplateResolver },
        providers: [
          importProvidersFrom(
            EffectsModule.forFeature([WorkoutExerciseTemplatesEffects])
          )
        ],    
        loadComponent: () =>
          import('./workout-exercise-template/workout-exercise-template.component').then((m) => m.WorkoutExerciseTemplateComponent),
      }
    ]

  },
];
