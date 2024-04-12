import { createFeatureSelector } from '@ngrx/store';
import { WorkoutTrainingsState } from './models/workoutTrainingsState.model';
import { TRAININGS_HUB_FEATURE_KEY } from '@workout-tracker/shared-store';

export const selectWorkoutTrainingsState =
  createFeatureSelector<WorkoutTrainingsState>(TRAININGS_HUB_FEATURE_KEY);
