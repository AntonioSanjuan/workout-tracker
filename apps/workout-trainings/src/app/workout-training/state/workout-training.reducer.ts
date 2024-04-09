import { createReducer, on } from '@ngrx/store';
import * as TrainingDetailsActions from "./workout-training.actions";
import { Training } from '@workout-tracker/models';

export const WORKOUT_TRAINING_FEATURE_KEY = 'training';


export interface WorkoutTrainingDetailsState {
  details: WorkoutTrainingDetails
}

export interface WorkoutTrainingDetails {
  training?: Training,
}

export const initialWorkoutTrainingDetailsState: WorkoutTrainingDetailsState = {
  details: {
    training: undefined
  }

}

export const workoutTrainingDetailsReducer = createReducer(
  initialWorkoutTrainingDetailsState,
    on(
      TrainingDetailsActions.getAuthenticatedUserTrainingDetailsRequestSuccess,
      TrainingDetailsActions.getAnonymousUserTrainingDetailsRequestSuccess,
      (state: WorkoutTrainingDetailsState, { training }) => ({
      ...state,
      details: {
        ...state.details,
        training: training
      }
    })),
);