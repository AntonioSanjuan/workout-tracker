import { createReducer, on } from '@ngrx/store';
import * as ExerciseDetailsActions from "./workout-exercise-template.actions";
import { ExerciseTemplate } from '@workout-tracker/models';

export const WORKOUT_EXERCISE_TEMPLATE_FEATURE_KEY = 'exercise-template';


export interface WorkoutExerciseTemplateDetailsState {
  details: WorkoutExerciseTemplateDetails
}

export interface WorkoutExerciseTemplateDetails {
  exercise?: ExerciseTemplate,
  trainings?: any
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
      ExerciseDetailsActions.getAuthenticatedUserExerciseTemplateDetailsRequestSuccess,
      ExerciseDetailsActions.getAnonymousUserExerciseTemplateDetailsRequestSuccess,
      (state: WorkoutExerciseTemplateDetailsState, { exercise }) => ({
      ...state,
      details: {
        ...state.details,
        exercise: exercise
      }
    })),
);