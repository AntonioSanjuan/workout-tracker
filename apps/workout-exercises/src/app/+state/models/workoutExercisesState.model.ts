import { WORKOUT_EXERCISE_FEATURE_KEY, WorkoutExerciseDetailsState } from "../../workout-exercise/state/workout-exercise.reducer";

export interface WorkoutExercisesState {
  [WORKOUT_EXERCISE_FEATURE_KEY]: WorkoutExerciseDetailsState
}