import { createReducer, on } from '@ngrx/store';
import * as TrainingExerciseActions from "./workout-training-exercise.actions";
import { Training, TrainingExercise } from '@workout-tracker/models';

export const WORKOUT_TRAINING_EXERCISE_FEATURE_KEY = 'workout-training-exercise';


export interface WorkoutTrainingExerciseState {
  trainingId?: string,
  trainingExercise?: TrainingExercise,
}

export const initialWorkoutTrainingExerciseState: WorkoutTrainingExerciseState = {
  trainingId: undefined,
  trainingExercise: undefined
}

export const workoutTrainingExerciseReducer = createReducer(
  initialWorkoutTrainingExerciseState,
    on(
      TrainingExerciseActions.getAuthenticatedUserTrainingExerciseRequestSuccess,
      TrainingExerciseActions.getAnonymousUserTrainingExerciseRequestSuccess,
      (state: WorkoutTrainingExerciseState, { trainingId, trainingExercise }) => ({
      ...state,
      trainingId: trainingId,
      trainingExercise: trainingExercise
    })),
    on(
      TrainingExerciseActions.addAuthenticatedUserTrainingExerciseSerieRequestSuccess,
      TrainingExerciseActions.addAnonymousUserTrainingExerciseSerieRequestSuccess,
      (state: WorkoutTrainingExerciseState, { trainingExerciseSerie }) => ({
      ...state,
      trainingExercise:{
        ...state.trainingExercise as TrainingExercise,
        series: [ ...state.trainingExercise?.series || [], trainingExerciseSerie ]
      }
    })),
);