import { ExerciseTemplatesHubState } from "@workout-tracker/shared-store";
import { WORKOUT_EXERCISE_TEMPLATE_FEATURE_KEY, WorkoutExerciseTemplateDetailsState } from "../../workout-exercise-template/state/workout-exercise-template.reducer";

export interface WorkoutExerciseTemplatesState extends ExerciseTemplatesHubState {
  [WORKOUT_EXERCISE_TEMPLATE_FEATURE_KEY]: WorkoutExerciseTemplateDetailsState
}