import { Action, combineReducers } from '@ngrx/store';

import { WorkoutTrainingsState } from './models/workoutTrainingsState.model';
import { initialWorkoutTrainingsState } from './models/workoutTrainingsState.initialState';
import { WORKOUT_TRAINING_FEATURE_KEY, workoutTrainingDetailsReducer } from '../workout-training/state/workout-training.reducer';
import { TRAININGS_FEATURE_KEY, trainingsReducer } from '@workout-tracker/shared-store';

export const WORKOUT_TRAININGS_FEATURE_KEY = 'workout-training';

export const workoutTrainingsReducer = (state: WorkoutTrainingsState = initialWorkoutTrainingsState, action: Action) => 
  combineReducers({
    [TRAININGS_FEATURE_KEY]: trainingsReducer,
    [WORKOUT_TRAINING_FEATURE_KEY]: workoutTrainingDetailsReducer
  }, initialWorkoutTrainingsState)(state, action)
