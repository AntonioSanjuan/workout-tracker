import { createFeatureSelector } from '@ngrx/store';
import {
  WORKOUT_EXERCISES_FEATURE_KEY,
} from './workout-exercises.reducer';
import { WorkoutExercisesState } from './models/workoutExercisesState.model';

// Lookup the 'Account' feature state managed by NgRx
export const selectWorkoutExercisesState =
  createFeatureSelector<WorkoutExercisesState>(WORKOUT_EXERCISES_FEATURE_KEY);
