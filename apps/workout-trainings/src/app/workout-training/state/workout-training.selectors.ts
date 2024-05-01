import { createSelector } from '@ngrx/store';
import { WORKOUT_TRAINING_FEATURE_KEY, WorkoutTrainingState } from './workout-training.reducer';
import { selectWorkoutTrainingsState } from '../../+state/workout-trainings.selectors';
import { WorkoutTrainingsState } from '../../+state/models/workoutTrainingsState.model';
import { Training } from '@workout-tracker/models';

export const selectWorkoutTrainingState = createSelector(
  selectWorkoutTrainingsState,
  (state: WorkoutTrainingsState) => state[WORKOUT_TRAINING_FEATURE_KEY]
);

export const selectWorkoutTraining = createSelector(
  selectWorkoutTrainingState,
  (state: WorkoutTrainingState) => state.training
);
export const getWorkoutTrainingExerciseById = (trainingExerciseId: string) => createSelector(selectWorkoutTraining, (training: Training | undefined ) => training?.trainingExercises?.find((trainingExercise) => trainingExercise.id === trainingExerciseId));

