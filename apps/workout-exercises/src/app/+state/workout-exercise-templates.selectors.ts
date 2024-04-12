import { createFeatureSelector } from '@ngrx/store';
import { WorkoutExercisesState } from './models/workoutExercisesState.model';
import { EXERCISE_TEMPLATES_HUB_FEATURE_KEY } from '@workout-tracker/shared-store';

export const selectWorkoutExerciseTemplatesState =
  createFeatureSelector<WorkoutExercisesState>(EXERCISE_TEMPLATES_HUB_FEATURE_KEY);
