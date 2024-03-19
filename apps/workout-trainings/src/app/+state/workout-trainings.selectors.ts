import { createFeatureSelector } from '@ngrx/store';
import { WorkoutTrainingsState } from './models/workoutExercisesState.model';
import { WORKOUT_TRAININGS_FEATURE_KEY } from './workout-trainings.reducer';

export const selectWorkoutTrainingsState =
  createFeatureSelector<WorkoutTrainingsState>(WORKOUT_TRAININGS_FEATURE_KEY);
