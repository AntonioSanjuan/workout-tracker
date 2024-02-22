import { createFeatureSelector, createSelector } from '@ngrx/store'
import { EXERCISES_FEATURE_KEY } from './exercises.reducer'
import { ExerciseState } from './models/exerciseState.model'


export const getExercisesState = createFeatureSelector<ExerciseState>(EXERCISES_FEATURE_KEY)
export const getExercisesList = createSelector(getExercisesState, (state: ExerciseState) => state.list)
export const getExercisesFiltered = createSelector(getExercisesState, (state: ExerciseState) => state.filtered)
export const getExercisesFilters = createSelector(getExercisesState, (state: ExerciseState) => state.query.filters)
