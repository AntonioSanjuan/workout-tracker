import { WORKOUT_TRAINING_EXERCISE_FEATURE_KEY, WorkoutTrainingExerciseState } from "../../workout-training-exercise/state/workout-training-exercise.reducer";
import { WORKOUT_TRAINING_FEATURE_KEY, WorkoutTrainingState } from "../../workout-training/state/workout-training.reducer";

export interface WorkoutTrainingsState {
  [WORKOUT_TRAINING_FEATURE_KEY]: WorkoutTrainingState,
  [WORKOUT_TRAINING_EXERCISE_FEATURE_KEY]: WorkoutTrainingExerciseState
}