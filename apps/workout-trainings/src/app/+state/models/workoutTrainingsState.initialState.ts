import { WorkoutTrainingsState } from "./workoutTrainingsState.model";
import { workoutTrainingsInitialState } from '@workout-tracker/shared-store'
import { WORKOUT_TRAINING_FEATURE_KEY, initialWorkoutTrainingDetailsState } from "../../workout-training/state/workout-training.reducer";

export const initialWorkoutTrainingsState: WorkoutTrainingsState = {
    ...workoutTrainingsInitialState,
    // set initial required properties
    [WORKOUT_TRAINING_FEATURE_KEY]: initialWorkoutTrainingDetailsState
}
