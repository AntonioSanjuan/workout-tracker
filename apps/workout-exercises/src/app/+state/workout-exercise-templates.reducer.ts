import { Action, combineReducers } from '@ngrx/store';

import { WorkoutExercisesState } from './models/workoutExercisesState.model';
import { initialWorkoutExercisesState } from './models/workoutExercisesState.initialState';
import { WORKOUT_EXERCISE_FEATURE_KEY, workoutExerciseDetailsReducer } from '../workout-exercise/state/workout-exercise.reducer';
import { EXERCISE_TEMPLATES_LIST_FEATURE_KEY, exerciseTemplatesListReducer } from '@workout-tracker/shared-store';

export const workoutExerciseTemplatesReducer = (state: WorkoutExercisesState = initialWorkoutExercisesState, action: Action) => 
  combineReducers({
    [EXERCISE_TEMPLATES_LIST_FEATURE_KEY]: exerciseTemplatesListReducer,
    [WORKOUT_EXERCISE_FEATURE_KEY]: workoutExerciseDetailsReducer
  }, initialWorkoutExercisesState)(state, action)
