import { Action, combineReducers } from '@ngrx/store';

import { WorkoutExercisesState } from './models/workoutExercisesState.model';
import { initialWorkoutExercisesState } from './models/workoutExercisesState.initialState';
import { WORKOUT_EXERCISES_DETAILS_FEATURE_KEY, workoutExerciseDetailsReducer } from '../workout-exercise-details/state/workout-exercise-details.reducer';

export const WORKOUT_EXERCISES_FEATURE_KEY = 'workout-exercises';

export const workoutExercisesReducer = (state: WorkoutExercisesState = initialWorkoutExercisesState, action: Action) => 
  combineReducers({
    [WORKOUT_EXERCISES_DETAILS_FEATURE_KEY]: workoutExerciseDetailsReducer
  }, initialWorkoutExercisesState)(state, action)
