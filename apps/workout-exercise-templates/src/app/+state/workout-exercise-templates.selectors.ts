import { createFeatureSelector } from '@ngrx/store';
import { WorkoutExerciseTemplatesState } from './models/workoutExerciseTemplatesState.model';
import { WORKOUT_EXERCISE_TEMPLATES_FEATURE_KEY } from './workout-exercise-templates.reducer';

export const selectWorkoutExerciseTemplatesState =
  createFeatureSelector<WorkoutExerciseTemplatesState>(WORKOUT_EXERCISE_TEMPLATES_FEATURE_KEY);
