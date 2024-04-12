import { createSelector } from '@ngrx/store';
import { WORKOUT_EXERCISE_FEATURE_KEY, WorkoutExerciseDetails, WorkoutExerciseDetailsState } from './workout-exercise.reducer';
import { selectWorkoutExerciseTemplatesState } from '../../+state/workout-exercise-templates.selectors';
import { WorkoutExercisesState } from '../../+state/models/workoutExercisesState.model';

export const selectWorkoutExerciseState = createSelector(
  selectWorkoutExerciseTemplatesState,
  (state: WorkoutExercisesState) => state[WORKOUT_EXERCISE_FEATURE_KEY]
);

export const selectWorkoutExerciseDetailsState = createSelector(
  selectWorkoutExerciseState,
  (state: WorkoutExerciseDetailsState) => state.details
);
export const selectWorkoutExerciseDetails = createSelector(
  selectWorkoutExerciseDetailsState,
  (state: WorkoutExerciseDetails) => state.exercise
);
export const selectWorkoutExerciseTrainingsDetails = createSelector(
  selectWorkoutExerciseDetailsState,
  (state: WorkoutExerciseDetails) => state.trainings
);


