import { WORKOUT_TRAINING_FEATURE_KEY, WorkoutTrainingDetailsState } from "../../workout-training/state/workout-training.reducer";

export interface WorkoutTrainingsState {
  [WORKOUT_TRAINING_FEATURE_KEY]: WorkoutTrainingDetailsState
}