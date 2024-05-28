import { createSelector } from '@ngrx/store';
import { WORKOUT_TRAINING_EXERCISE_FEATURE_KEY, WorkoutTrainingExerciseState } from './workout-training-exercise.reducer';
import { selectWorkoutTrainingsState } from '../../+state/workout-trainings.selectors';
import { WorkoutTrainingsState } from '../../+state/models/workoutTrainingsState.model';

export const selectWorkoutTrainingExerciseState = createSelector(
  selectWorkoutTrainingsState,
  (state: WorkoutTrainingsState) => state[WORKOUT_TRAINING_EXERCISE_FEATURE_KEY]
);

export const selectWorkoutTrainingExerciseParentTrainingId = createSelector(
  selectWorkoutTrainingExerciseState,
  (state: WorkoutTrainingExerciseState) => state.trainingId
);

export const selectWorkoutTrainingExercise = createSelector(
  selectWorkoutTrainingExerciseState,
  (state: WorkoutTrainingExerciseState) => state.trainingExercise
);

export const selectWorkoutTrainingExercisePreviousSimilarTraining = createSelector(
  selectWorkoutTrainingExerciseState,
  (state: WorkoutTrainingExerciseState) => state.previousTrainingExercise
);

