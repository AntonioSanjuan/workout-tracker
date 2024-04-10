import { EXERCISE_TEMPLATES_LIST_FEATURE_KEY, exerciseTemplatesListInitialState } from "../../exercise-templates-list";
import { WorkoutExerciseTemplatesState } from "./workoutExerciseTemplatesState.model";

export const workoutExerciseTemplatesInitialState: WorkoutExerciseTemplatesState = {
    [EXERCISE_TEMPLATES_LIST_FEATURE_KEY]: exerciseTemplatesListInitialState
  }