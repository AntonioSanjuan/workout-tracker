import { Action, combineReducers } from '@ngrx/store';

import { WorkoutExerciseTemplatesState } from './models/workoutExerciseTemplatesState.model';
import { initialWorkoutExerciseTemplatesState } from './models/workoutExerciseTemplatesState.initialState';
import { WORKOUT_EXERCISE_TEMPLATE_FEATURE_KEY, workoutExerciseTemplateDetailsReducer } from '../workout-exercise-template/state/workout-exercise-template.reducer';

export const WORKOUT_EXERCISE_TEMPLATES_FEATURE_KEY = 'exercise-template'
export const workoutExerciseTemplatesReducer = (state: WorkoutExerciseTemplatesState = initialWorkoutExerciseTemplatesState, action: Action) => 
  combineReducers({
    [WORKOUT_EXERCISE_TEMPLATE_FEATURE_KEY]: workoutExerciseTemplateDetailsReducer
  }, initialWorkoutExerciseTemplatesState)(state, action)
