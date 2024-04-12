import { TRAININGS_HUB_FEATURE_KEY } from "@workout-tracker/shared-store";
import { initialWorkoutTrainingsState } from "../../models/workoutTrainingsState.initialState";

export const workoutTrainingsAppStateMock = {
    [TRAININGS_HUB_FEATURE_KEY]: initialWorkoutTrainingsState
}