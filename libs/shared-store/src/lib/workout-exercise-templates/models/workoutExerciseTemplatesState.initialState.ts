import { EXERCISE_TEMPLATES_FEATURE_KEY, exerciseTemplatesInitialState } from "../../exercise-templates";
import { WorkoutExerciseTemplatesState } from "./workoutExerciseTemplatesState.model";

export const workoutExerciseTemplatesInitialState: WorkoutExerciseTemplatesState = {
    [EXERCISE_TEMPLATES_FEATURE_KEY]: exerciseTemplatesInitialState
  }