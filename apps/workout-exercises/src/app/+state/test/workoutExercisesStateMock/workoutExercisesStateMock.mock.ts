import { WORKOUT_EXERCISE_TEMPLATES_FEATURE_KEY } from "@workout-tracker/shared-store";
import { initialWorkoutExercisesState } from "../../models/workoutExercisesState.initialState";

export const workoutExercisesAppStateMock = {
    [WORKOUT_EXERCISE_TEMPLATES_FEATURE_KEY]: initialWorkoutExercisesState
}