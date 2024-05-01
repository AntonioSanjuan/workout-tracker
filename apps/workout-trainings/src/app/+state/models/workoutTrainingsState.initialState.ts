import { WorkoutTrainingsState } from "./workoutTrainingsState.model";
import { WORKOUT_TRAINING_FEATURE_KEY, initialWorkoutTrainingState } from "../../workout-training/state/workout-training.reducer";
import { WORKOUT_TRAINING_EXERCISE_FEATURE_KEY, initialWorkoutTrainingExerciseState } from "../../workout-training-exercise/state/workout-training-exercise.reducer";

export const initialWorkoutTrainingsState: WorkoutTrainingsState = {
    // set initial required properties
    [WORKOUT_TRAINING_FEATURE_KEY]: initialWorkoutTrainingState,
    [WORKOUT_TRAINING_EXERCISE_FEATURE_KEY]: initialWorkoutTrainingExerciseState
}
