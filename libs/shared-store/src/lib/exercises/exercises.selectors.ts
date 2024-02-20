import { createFeatureSelector, createSelector } from '@ngrx/store'
import { EXERCISES_FEATURE_KEY } from './exercises.reducer'
import { ExerciseState } from './models/exerciseState.model'


export const getExercisesState = createFeatureSelector<ExerciseState>(EXERCISES_FEATURE_KEY)
