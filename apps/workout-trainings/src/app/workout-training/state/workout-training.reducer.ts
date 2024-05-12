import { createReducer, on } from '@ngrx/store';
import * as TrainingDetailsActions from "./workout-training.actions";
import { Training } from '@workout-tracker/models';

export const WORKOUT_TRAINING_FEATURE_KEY = 'workout-training';


export interface WorkoutTrainingState {
  training?: Training,
}

export const initialWorkoutTrainingState: WorkoutTrainingState = {
    training: undefined
}

export const workoutTrainingReducer = createReducer(
  initialWorkoutTrainingState,
  on(
    TrainingDetailsActions.getUserTrainingRequest,
    (state: WorkoutTrainingState) => ({
    ...initialWorkoutTrainingState
  })),
    on(
      TrainingDetailsActions.getAuthenticatedUserTrainingRequestSuccess,
      TrainingDetailsActions.getAnonymousUserTrainingRequestSuccess,
      (state: WorkoutTrainingState, { training }) => ({
      ...state,
      training: training
    })),
    on(
      TrainingDetailsActions.addAuthenticatedUserTrainingExerciseRequestSuccess,
      TrainingDetailsActions.addAnonymousUserTrainingExerciseRequestSuccess,
      (state: WorkoutTrainingState, { trainingExercise }) => ({
      ...state,
      training: { 
        ...state.training as Training,
        trainingExercises: [ ...state.training?.trainingExercises || [], trainingExercise ]
        }
      
    })),
);