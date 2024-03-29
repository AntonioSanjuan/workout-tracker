import { Action, combineReducers } from '@ngrx/store';

import { WorkoutExercisesState } from './models/workoutExercisesState.model';
import { initialWorkoutExercisesState } from './models/workoutExercisesState.initialState';
import { WORKOUT_EXERCISE_FEATURE_KEY, workoutExerciseDetailsReducer } from '../workout-exercise/state/workout-exercise.reducer';

export const WORKOUT_EXERCISES_FEATURE_KEY = 'workout-exercise';

export const workoutExercisesReducer = (state: WorkoutExercisesState = initialWorkoutExercisesState, action: Action) => 
  combineReducers({
    [WORKOUT_EXERCISE_FEATURE_KEY]: workoutExerciseDetailsReducer
  }, initialWorkoutExercisesState)(state, action)
