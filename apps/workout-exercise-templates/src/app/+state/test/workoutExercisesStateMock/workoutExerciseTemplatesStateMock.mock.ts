import { EXERCISE_TEMPLATES_HUB_FEATURE_KEY } from "@workout-tracker/shared-store";
import { initialWorkoutExerciseTemplatesState } from "../../models/workoutExerciseTemplatesState.initialState";

export const workoutExerciseTemplatesAppStateMock = {
    [EXERCISE_TEMPLATES_HUB_FEATURE_KEY]: initialWorkoutExerciseTemplatesState
}