import { WORKOUT_EXERCISE_FEATURE_KEY, initialWorkoutExerciseDetailsState } from "../../workout-exercise/state/workout-exercise.reducer";
import { workoutExerciseTemplatesInitialState } from '@workout-tracker/shared-store'
import { WorkoutExercisesState } from "./workoutExercisesState.model";

export const initialWorkoutExercisesState: WorkoutExercisesState = {
    ...workoutExerciseTemplatesInitialState,
    // set initial required properties
    [WORKOUT_EXERCISE_FEATURE_KEY]: initialWorkoutExerciseDetailsState
}
