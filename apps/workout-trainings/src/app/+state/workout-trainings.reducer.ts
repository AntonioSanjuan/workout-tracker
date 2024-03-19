import { Action, combineReducers } from '@ngrx/store';

import { WorkoutTrainingsState } from './models/workoutExercisesState.model';
import { initialWorkoutTrainingsState } from './models/workoutExercisesState.initialState';

export const WORKOUT_TRAININGS_FEATURE_KEY = 'workout-training';

export const workoutTrainingsReducer = (state: WorkoutTrainingsState = initialWorkoutTrainingsState, action: Action) => 
  combineReducers({
  }, initialWorkoutTrainingsState)(state, action)
