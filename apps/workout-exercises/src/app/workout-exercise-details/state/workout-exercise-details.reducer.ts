import { createReducer, on } from '@ngrx/store';
import * as ExerciseDetailsActions from "./workout-exercise-details.actions";
import { Exercise } from '@workout-tracker/models';

export const WORKOUT_EXERCISES_DETAILS_FEATURE_KEY = 'pokemonDetails';


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