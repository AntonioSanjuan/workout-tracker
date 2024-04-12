import { Action, combineReducers } from '@ngrx/store';

import { WorkoutExerciseTemplatesState } from './models/workoutExerciseTemplatesState.model';
import { initialWorkoutExerciseTemplatesState } from './models/workoutExerciseTemplatesState.initialState';
import { WORKOUT_EXERCISE_TEMPLATE_FEATURE_KEY, workoutExerciseTemplateDetailsReducer } from '../workout-exercise-template/state/workout-exercise-template.reducer';
import { EXERCISE_TEMPLATES_LIST_FEATURE_KEY, exerciseTemplatesListReducer } from '@workout-tracker/shared-store';

export const workoutExerciseTemplatesReducer = (state: WorkoutExerciseTemplatesState = initialWorkoutExerciseTemplatesState, action: Action) => 
  combineReducers({
    [EXERCISE_TEMPLATES_LIST_FEATURE_KEY]: exerciseTemplatesListReducer,
    [WORKOUT_EXERCISE_TEMPLATE_FEATURE_KEY]: workoutExerciseTemplateDetailsReducer
  }, initialWorkoutExerciseTemplatesState)(state, action)
