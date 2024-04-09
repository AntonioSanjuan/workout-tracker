import { WorkoutExerciseTemplatesState } from "@workout-tracker/shared-store";
import { WORKOUT_EXERCISE_FEATURE_KEY, WorkoutExerciseDetailsState } from "../../workout-exercise/state/workout-exercise.reducer";

export interface WorkoutExercisesState extends WorkoutExerciseTemplatesState {
  [WORKOUT_EXERCISE_FEATURE_KEY]: WorkoutExerciseDetailsState
}