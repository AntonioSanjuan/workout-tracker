import { WorkoutTrainingsState } from "./workoutTrainingsState.model";
import { trainingsHubInitialState } from '@workout-tracker/shared-store'
import { WORKOUT_TRAINING_FEATURE_KEY, initialWorkoutTrainingDetailsState } from "../../workout-training/state/workout-training.reducer";

export const initialWorkoutTrainingsState: WorkoutTrainingsState = {
    ...trainingsHubInitialState,
    // set initial required properties
    [WORKOUT_TRAINING_FEATURE_KEY]: initialWorkoutTrainingDetailsState
}
