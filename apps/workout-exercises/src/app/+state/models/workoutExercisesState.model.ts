import { WORKOUT_EXERCISES_DETAILS_FEATURE_KEY, WorkoutExerciseDetailsState } from "../../workout-exercise-details/state/workout-exercise-details.reducer";

export interface WorkoutExercisesState {
  [WORKOUT_EXERCISES_DETAILS_FEATURE_KEY]: WorkoutExerciseDetailsState
}