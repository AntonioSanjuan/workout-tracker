import { createFeatureSelector, createSelector } from '@ngrx/store'
import { ExerciseTemplatesListState } from './models/exerciseTemplatesListState.model'
import { EXERCISE_TEMPLATES_LIST_FEATURE_KEY } from './exercise-templates-list.reducer'


export const getExerciseTemplatesListState = createFeatureSelector<ExerciseTemplatesListState>(EXERCISE_TEMPLATES_LIST_FEATURE_KEY)
export const getExerciseTemplatesList = createSelector(getExerciseTemplatesListState, (state: ExerciseTemplatesListState) => state.list)
export const getExerciseTemplatesListFiltered = createSelector(getExerciseTemplatesListState, (state: ExerciseTemplatesListState) => state.filtered)
export const getExerciseTemplatesListFilters = createSelector(getExerciseTemplatesListState, (state: ExerciseTemplatesListState) => state.query.filters)

//exerciseDetails
export const getExerciseTemplateById = (exerciseTemplateId: string) => createSelector(getExerciseTemplatesListState, (state: ExerciseTemplatesListState) => state.list.find((exercise) => exercise.id === exerciseTemplateId));
