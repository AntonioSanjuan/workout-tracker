import { createAction, props } from "@ngrx/store"
import { Exercise, ExerciseQueryFilters } from "@workout-tracker/models"
import firebase from 'firebase/compat/app';

export const GET_EXERCISES_REQUEST = 'EXERCISES Request'
export const getExercisesRequest = createAction(GET_EXERCISES_REQUEST)
export const GET_EXERCISES_SUCCESS = 'EXERCISES Success'
export const getExercisesRequestSuccess = createAction(GET_EXERCISES_SUCCESS, props<{ exercises: Exercise[]}>())
export const GET_EXERCISES_ERROR = 'EXERCISES Error'
export const getExercisesRequestError = createAction(GET_EXERCISES_ERROR, props<{ error: firebase.FirebaseError }>())

export const UPDATE_EXERCISES_QUERY_FILTERS = 'EXERCISES update query filters'
export const updateExercisesQueryFilters = createAction(UPDATE_EXERCISES_QUERY_FILTERS, props<{ filters: ExerciseQueryFilters}>())
  