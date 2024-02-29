import { WORKOUT_EXERCISES_DETAILS_FEATURE_KEY, initialWorkoutExerciseDetailsState } from "../../workout-exercise-details/state/workout-exercise-details.reducer";
import { WorkoutExercisesState } from "./workoutExercisesState.model";

export const initialWorkoutExercisesState: WorkoutExercisesState = {
    // set initial required properties
    [WORKOUT_EXERCISES_DETAILS_FEATURE_KEY]: initialWorkoutExerciseDetailsState
}
