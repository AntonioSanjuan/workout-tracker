import { WORKOUT_EXERCISE_TEMPLATE_FEATURE_KEY, WorkoutExerciseTemplateDetailsState } from "../../workout-exercise-template/state/workout-exercise-template.reducer";

export interface WorkoutExerciseTemplatesState {
  [WORKOUT_EXERCISE_TEMPLATE_FEATURE_KEY]: WorkoutExerciseTemplateDetailsState
}