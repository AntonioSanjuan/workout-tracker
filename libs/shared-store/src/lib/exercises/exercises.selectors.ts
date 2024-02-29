import { createFeatureSelector, createSelector } from '@ngrx/store'
import { EXERCISES_FEATURE_KEY } from './exercises.reducer'
import { ExercisesState } from './models/exercisesState.model'


export const getExercisesState = createFeatureSelector<ExercisesState>(EXERCISES_FEATURE_KEY)
export const getExercisesList = createSelector(getExercisesState, (state: ExercisesState) => state.list)
export const getExercisesFiltered = createSelector(getExercisesState, (state: ExercisesState) => state.filtered)
export const getExercisesFilters = createSelector(getExercisesState, (state: ExercisesState) => state.query.filters)

//exerciseDetails
export const getExerciseById = (exerciseId: string) => createSelector(getExercisesState, (state: ExercisesState) => state.list.find((exercise) => exercise.id === exerciseId));
