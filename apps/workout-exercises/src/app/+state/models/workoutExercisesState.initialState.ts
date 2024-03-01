import { WORKOUT_EXERCISE_FEATURE_KEY, initialWorkoutExerciseDetailsState } from "../../workout-exercise/state/workout-exercise.reducer";
import { WorkoutExercisesState } from "./workoutExercisesState.model";

export const initialWorkoutExercisesState: WorkoutExercisesState = {
    // set initial required properties
    [WORKOUT_EXERCISE_FEATURE_KEY]: initialWorkoutExerciseDetailsState
}
