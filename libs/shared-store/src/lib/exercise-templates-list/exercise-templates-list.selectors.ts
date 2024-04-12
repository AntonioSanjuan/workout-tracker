import { createSelector } from '@ngrx/store'
import { ExerciseTemplatesListState } from './models/exerciseTemplatesListState.model'
import { selectExerciseTemplatesHubFeature } from '../exercise-templates-hub/exercise-templates-hub.selectors'
import { ExerciseTemplatesHubState } from '../exercise-templates-hub'
import { EXERCISE_TEMPLATES_LIST_FEATURE_KEY } from './exercise-templates-list.reducer'

export const getExerciseTemplatesListState = createSelector(
    selectExerciseTemplatesHubFeature,
    (state: ExerciseTemplatesHubState) => state[EXERCISE_TEMPLATES_LIST_FEATURE_KEY]
)
// export const getExerciseTemplatesState = createFeatureSelector<ExerciseTemplatesState>(EXERCISE_TEMPLATES_FEATURE_KEY)
export const getExerciseTemplatesList = createSelector(getExerciseTemplatesListState, (state: ExerciseTemplatesListState) => state.list)
export const getExerciseTemplatesListFiltered = createSelector(getExerciseTemplatesListState, (state: ExerciseTemplatesListState) => state.filtered)
export const getExerciseTemplatesListFilters = createSelector(getExerciseTemplatesListState, (state: ExerciseTemplatesListState) => state.query.filters)

//exerciseDetails
export const getExerciseTemplateById = (exerciseTemplateId: string) => createSelector(getExerciseTemplatesListState, (state: ExerciseTemplatesListState) => state.list.find((exercise) => exercise.id === exerciseTemplateId));
