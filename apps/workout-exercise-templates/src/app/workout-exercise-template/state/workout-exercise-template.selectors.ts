import { createSelector } from '@ngrx/store';
import { WORKOUT_EXERCISE_TEMPLATE_FEATURE_KEY, WorkoutExerciseTemplateDetails, WorkoutExerciseTemplateDetailsState } from './workout-exercise-template.reducer';
import { selectWorkoutExerciseTemplatesState } from '../../+state/workout-exercise-templates.selectors';
import { WorkoutExerciseTemplatesState } from '../../+state/models/workoutExerciseTemplatesState.model';

export const selectWorkoutExerciseTemplateState = createSelector(
  selectWorkoutExerciseTemplatesState,
  (state: WorkoutExerciseTemplatesState) => state[WORKOUT_EXERCISE_TEMPLATE_FEATURE_KEY]
);

export const selectWorkoutExerciseTemplateDetailsState = createSelector(
  selectWorkoutExerciseTemplateState,
  (state: WorkoutExerciseTemplateDetailsState) => state.details
);
export const selectWorkoutExerciseTemplateDetails = createSelector(
  selectWorkoutExerciseTemplateDetailsState,
  (state: WorkoutExerciseTemplateDetails) => state.exercise
);
export const selectWorkoutExerciseTemplateTrainingsDetails = createSelector(
  selectWorkoutExerciseTemplateDetailsState,
  (state: WorkoutExerciseTemplateDetails) => state.trainings
);


