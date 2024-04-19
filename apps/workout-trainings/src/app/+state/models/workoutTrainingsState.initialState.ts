import { WorkoutTrainingsState } from "./workoutTrainingsState.model";
import { WORKOUT_TRAINING_FEATURE_KEY, initialWorkoutTrainingDetailsState } from "../../workout-training/state/workout-training.reducer";

export const initialWorkoutTrainingsState: WorkoutTrainingsState = {
    // set initial required properties
    [WORKOUT_TRAINING_FEATURE_KEY]: initialWorkoutTrainingDetailsState
}
