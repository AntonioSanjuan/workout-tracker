import { createFeatureSelector, createSelector } from '@ngrx/store'
import { EXERCISE_TEMPLATES_FEATURE_KEY } from './exercise-templates.reducer'
import { ExerciseTemplatesState } from './models/exerciseTemplatesState.model'


export const getExerciseTemplatesState = createFeatureSelector<ExerciseTemplatesState>(EXERCISE_TEMPLATES_FEATURE_KEY)
export const getExerciseTemplatesList = createSelector(getExerciseTemplatesState, (state: ExerciseTemplatesState) => state.list)
export const getExerciseTemplatesFiltered = createSelector(getExerciseTemplatesState, (state: ExerciseTemplatesState) => state.filtered)
export const getExerciseTemplatesFilters = createSelector(getExerciseTemplatesState, (state: ExerciseTemplatesState) => state.query.filters)

//exerciseDetails
export const getExerciseTemplateById = (exerciseTemplateId: string) => createSelector(getExerciseTemplatesState, (state: ExerciseTemplatesState) => state.list.find((exercise) => exercise.id === exerciseTemplateId));
