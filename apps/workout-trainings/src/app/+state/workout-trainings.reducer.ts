import { Action, combineReducers } from '@ngrx/store';

import { WorkoutTrainingsState } from './models/workoutTrainingsState.model';
import { initialWorkoutTrainingsState } from './models/workoutTrainingsState.initialState';
import { WORKOUT_TRAINING_FEATURE_KEY, workoutTrainingReducer } from '../workout-training/state/workout-training.reducer';
import { WORKOUT_TRAINING_EXERCISE_FEATURE_KEY, workoutTrainingExerciseReducer } from '../workout-training-exercise/state/workout-training-exercise.reducer';

export const WORKOUT_TRAININGS_FEATURE_KEY = 'workout-trainings'
export const workoutTrainingsReducer = (state: WorkoutTrainingsState = initialWorkoutTrainingsState, action: Action) => 
  combineReducers({
    [WORKOUT_TRAINING_FEATURE_KEY]: workoutTrainingReducer,
    [WORKOUT_TRAINING_EXERCISE_FEATURE_KEY]: workoutTrainingExerciseReducer
  }, initialWorkoutTrainingsState)(state, action)
