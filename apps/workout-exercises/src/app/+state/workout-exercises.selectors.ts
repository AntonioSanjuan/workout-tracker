import { createFeatureSelector } from '@ngrx/store';
import { WorkoutExercisesState } from './models/workoutExercisesState.model';
import { WORKOUT_EXERCISE_TEMPLATES_FEATURE_KEY } from '@workout-tracker/shared-store';

export const selectWorkoutExercisesState =
  createFeatureSelector<WorkoutExercisesState>(WORKOUT_EXERCISE_TEMPLATES_FEATURE_KEY);
