import { WORKOUT_EXERCISES_FEATURE_KEY } from "../../workout-exercises.reducer";
import { initialWorkoutExercisesState } from "../../models/workoutExercisesState.initialState";

export const workoutExercisesAppStateMock = {
    [WORKOUT_EXERCISES_FEATURE_KEY]: initialWorkoutExercisesState
}