import { initialWorkoutTrainingsState } from "../../models/workoutTrainingsState.initialState";
import { WORKOUT_TRAININGS_FEATURE_KEY } from "../../workout-trainings.reducer";

export const workoutTrainingsAppStateMock = {
    [WORKOUT_TRAININGS_FEATURE_KEY]: initialWorkoutTrainingsState
}