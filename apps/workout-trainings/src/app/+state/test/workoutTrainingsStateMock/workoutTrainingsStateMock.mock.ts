import { initialWorkoutTrainingsState } from "../../models/workoutExercisesState.initialState";
import { WORKOUT_TRAININGS_FEATURE_KEY } from "../../workout-trainings.reducer";

export const workoutTrainingsAppStateMock = {
    [WORKOUT_TRAININGS_FEATURE_KEY]: initialWorkoutTrainingsState
}