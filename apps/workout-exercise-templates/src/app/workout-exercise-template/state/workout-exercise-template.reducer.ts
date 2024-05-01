import { createReducer, on } from '@ngrx/store';
import * as ExerciseDetailsActions from "./workout-exercise-template.actions";
import { ExerciseTemplate, Training } from '@workout-tracker/models';

export const WORKOUT_EXERCISE_TEMPLATE_FEATURE_KEY = 'exercise-template';


export interface WorkoutExerciseTemplateDetailsState {
  details: WorkoutExerciseTemplateDetails
}

export interface WorkoutExerciseTemplateDetails {
  exercise?: ExerciseTemplate,
  trainings?: Training[]
}

export const initialWorkoutExerciseTemplateDetailsState: WorkoutExerciseTemplateDetailsState = {
  details: {
    exercise: undefined,
    trainings: undefined
  }

}

export const workoutExerciseTemplateDetailsReducer = createReducer(
  initialWorkoutExerciseTemplateDetailsState,
  on(
    ExerciseDetailsActions.getUserExerciseTemplateDetailsRequest,
    (state: WorkoutExerciseTemplateDetailsState
    ) => ({
    ...initialWorkoutExerciseTemplateDetailsState
  })),
    on(
      ExerciseDetailsActions.getAuthenticatedUserExerciseTemplateDetailsRequestSuccess,
      ExerciseDetailsActions.getAnonymousUserExerciseTemplateDetailsRequestSuccess,
      (state: WorkoutExerciseTemplateDetailsState, { exercise }) => ({
      ...state,
      details: {
        ...state.details,
        exercise: exercise
      }
    })),
    on(
      ExerciseDetailsActions.getAuthenticatedUserExerciseTemplateTrainingsDetailsRequestSuccess,
      ExerciseDetailsActions.getAnonymousUserExerciseTemplateTrainingsDetailsRequestSuccess,
      (state: WorkoutExerciseTemplateDetailsState, { trainings }) => ({
      ...state,
      details: {
        ...state.details,
        trainings: trainings
      }
    })),
);