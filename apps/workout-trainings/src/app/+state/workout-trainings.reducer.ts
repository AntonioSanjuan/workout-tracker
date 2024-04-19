import { Action, combineReducers } from '@ngrx/store';

import { WorkoutTrainingsState } from './models/workoutTrainingsState.model';
import { initialWorkoutTrainingsState } from './models/workoutTrainingsState.initialState';
import { WORKOUT_TRAINING_FEATURE_KEY, workoutTrainingDetailsReducer } from '../workout-training/state/workout-training.reducer';

export const WORKOUT_TRAININGS_FEATURE_KEY = 'trainings'
export const workoutTrainingsReducer = (state: WorkoutTrainingsState = initialWorkoutTrainingsState, action: Action) => 
  combineReducers({
    [WORKOUT_TRAINING_FEATURE_KEY]: workoutTrainingDetailsReducer
  }, initialWorkoutTrainingsState)(state, action)
