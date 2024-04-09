import { createSelector } from '@ngrx/store';
import { WORKOUT_TRAINING_FEATURE_KEY, WorkoutTrainingDetails, WorkoutTrainingDetailsState } from './workout-training.reducer';
import { selectWorkoutTrainingsState } from '../../+state/workout-trainings.selectors';
import { WorkoutTrainingsState } from '../../+state/models/workoutTrainingsState.model';

export const selectWorkoutTrainingState = createSelector(
  selectWorkoutTrainingsState,
  (state: WorkoutTrainingsState) => state[WORKOUT_TRAINING_FEATURE_KEY]
);

export const selectWorkoutTrainingDetailsState = createSelector(
  selectWorkoutTrainingState,
  (state: WorkoutTrainingDetailsState) => state.details
);
export const selectWorkoutTrainingDetails = createSelector(
  selectWorkoutTrainingDetailsState,
  (state: WorkoutTrainingDetails) => state.training
);


