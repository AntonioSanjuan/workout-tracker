import { createSelector } from '@ngrx/store'
import { ExerciseTemplatesState } from './models/exerciseTemplatesState.model'
import { selectWorkoutExerciseTemplatesFeature } from '../workout-exercise-templates/workout-exercise-templates.selectors'
import { WorkoutExerciseTemplatesState } from '../workout-exercise-templates'
import { EXERCISE_TEMPLATES_FEATURE_KEY } from './exercise-templates.reducer'


export const getExerciseTemplatesState = createSelector(
    selectWorkoutExerciseTemplatesFeature,
    (state: WorkoutExerciseTemplatesState) => state[EXERCISE_TEMPLATES_FEATURE_KEY]
)
// export const getExerciseTemplatesState = createFeatureSelector<ExerciseTemplatesState>(EXERCISE_TEMPLATES_FEATURE_KEY)
export const getExerciseTemplatesList = createSelector(getExerciseTemplatesState, (state: ExerciseTemplatesState) => state.list)
export const getExerciseTemplatesFiltered = createSelector(getExerciseTemplatesState, (state: ExerciseTemplatesState) => state.filtered)
export const getExerciseTemplatesFilters = createSelector(getExerciseTemplatesState, (state: ExerciseTemplatesState) => state.query.filters)

//exerciseDetails
export const getExerciseTemplateById = (exerciseTemplateId: string) => createSelector(getExerciseTemplatesState, (state: ExerciseTemplatesState) => state.list.find((exercise) => exercise.id === exerciseTemplateId));
