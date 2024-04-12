import { createFeatureSelector } from '@ngrx/store';
import { WorkoutExerciseTemplatesState } from './models/workoutExerciseTemplatesState.model';
import { EXERCISE_TEMPLATES_HUB_FEATURE_KEY } from '@workout-tracker/shared-store';

export const selectWorkoutExerciseTemplatesState =
  createFeatureSelector<WorkoutExerciseTemplatesState>(EXERCISE_TEMPLATES_HUB_FEATURE_KEY);
