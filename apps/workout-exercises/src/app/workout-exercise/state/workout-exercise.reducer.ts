import { createReducer, on } from '@ngrx/store';
import * as ExerciseDetailsActions from "./workout-exercise.actions";
import { Exercise } from '@workout-tracker/models';

export const WORKOUT_EXERCISE_FEATURE_KEY = 'exercise';


export interface WorkoutExerciseDetailsState {
  details: WorkoutExerciseDetails
}

export interface WorkoutExerciseDetails {
  exercise?: Exercise,
  trainings?: any
}

export const initialWorkoutExerciseDetailsState: WorkoutExerciseDetailsState = {
  details: {
    exercise: undefined,
    trainings: undefined
  }

}

export const workoutExerciseDetailsReducer = createReducer(
  initialWorkoutExerciseDetailsState,
    on(
      ExerciseDetailsActions.getAuthenticatedUserExerciseDetailsRequestSuccess,
      ExerciseDetailsActions.getAnonymousUserExerciseDetailsRequestSuccess,
      (state: WorkoutExerciseDetailsState, { exercise }) => ({
      ...state,
      details: {
        ...state.details,
        exercise: exercise
      }
    })),
);