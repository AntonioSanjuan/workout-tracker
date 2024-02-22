import { createAction, props } from "@ngrx/store"
import { Exercise, ExerciseQueryFilters } from "@workout-tracker/models"
import firebase from 'firebase/compat/app';

export const GET_AUTHENTICATED_USER_EXERCISES_REQUEST = 'GET AUTHENTICATED USER EXERCISES Request'
export const getAuthenticatedUserExercisesRequest = createAction(GET_AUTHENTICATED_USER_EXERCISES_REQUEST)
export const GET_AUTHENTICATED_USER_EXERCISES_SUCCESS = 'GET AUTHENTICATED USER EXERCISES Success'
export const getAuthenticatedUserExercisesRequestSuccess = createAction(GET_AUTHENTICATED_USER_EXERCISES_SUCCESS, props<{ exercises: Exercise[] }>())
export const GET_AUTHENTICATED_USER_EXERCISES_ERROR = 'GET AUTHENTICATED USER EXERCISES Error'
export const getAuthenticatedUserExercisesRequestError = createAction(GET_AUTHENTICATED_USER_EXERCISES_ERROR, props<{ error: firebase.FirebaseError }>())
export const GET_ANONYMOUS_USER_EXERCISES_REQUEST = 'GET ANONYMOUS USER EXERCISES Request'
export const getAnonymousUserExercisesRequest = createAction(GET_ANONYMOUS_USER_EXERCISES_REQUEST)
export const GET_ANONYMOUS_USER_EXERCISES_SUCCESS = 'GET ANONYMOUS USER EXERCISES Success'
export const getAnonymousUserExercisesRequestSuccess = createAction(GET_ANONYMOUS_USER_EXERCISES_SUCCESS, props<{ exercises: Exercise[] }>())

export const UPDATE_EXERCISES_QUERY_FILTERS = 'EXERCISES update query filters'
export const updateExercisesQueryFilters = createAction(UPDATE_EXERCISES_QUERY_FILTERS, props<{ filters: ExerciseQueryFilters}>())
  