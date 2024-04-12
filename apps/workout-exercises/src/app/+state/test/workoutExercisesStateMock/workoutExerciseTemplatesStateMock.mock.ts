import { EXERCISE_TEMPLATES_HUB_FEATURE_KEY } from "@workout-tracker/shared-store";
import { initialWorkoutExercisesState } from "../../models/workoutExercisesState.initialState";

export const workoutExerciseTemplatesAppStateMock = {
    [EXERCISE_TEMPLATES_HUB_FEATURE_KEY]: initialWorkoutExercisesState
}