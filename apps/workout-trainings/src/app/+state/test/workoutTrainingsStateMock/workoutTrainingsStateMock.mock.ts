import { WORKOUT_TRAININGS_FEATURE_KEY } from "@workout-tracker/shared-store";
import { initialWorkoutTrainingsState } from "../../models/workoutTrainingsState.initialState";

export const workoutTrainingsAppStateMock = {
    [WORKOUT_TRAININGS_FEATURE_KEY]: initialWorkoutTrainingsState
}