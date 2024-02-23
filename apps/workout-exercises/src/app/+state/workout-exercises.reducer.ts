import { Action, combineReducers } from '@ngrx/store';

import { WorkoutExercisesState } from './models/workoutExercisesState.model';
import { initialWorkoutExercisesState } from './models/workoutExercisesState.initialState';

export const WORKOUT_EXERCISES_FEATURE_KEY = 'workout-exercises';

export const workoutExercisesReducer = (state: WorkoutExercisesState = initialWorkoutExercisesState, action: Action) => 
  combineReducers({
  }, initialWorkoutExercisesState)(state, action)
