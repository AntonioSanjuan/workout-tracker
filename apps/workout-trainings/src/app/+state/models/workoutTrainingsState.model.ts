import { TrainingsHubState } from "@workout-tracker/shared-store";
import { WORKOUT_TRAINING_FEATURE_KEY, WorkoutTrainingDetailsState } from "../../workout-training/state/workout-training.reducer";

export interface WorkoutTrainingsState extends TrainingsHubState {
  [WORKOUT_TRAINING_FEATURE_KEY]: WorkoutTrainingDetailsState
}