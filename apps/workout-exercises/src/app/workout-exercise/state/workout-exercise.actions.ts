import { createAction, props } from '@ngrx/store';
import { Exercise } from '@workout-tracker/models';

export const GET_USER_EXERCISE_DETAILS_REQUEST = 'GET USER EXERCISE DETAILS'
export const getUserExerciseDetailsRequest = createAction(GET_USER_EXERCISE_DETAILS_REQUEST, props<{ exerciseId: string}>())
export const GET_AUTHENTICATED_USER_EXERCISE_DETAILS_REQUEST = 'GET AUTHENTICATED USER EXERCISE DETAILS Request'
export const getAuthenticatedUserExerciseDetailsRequest = createAction(GET_AUTHENTICATED_USER_EXERCISE_DETAILS_REQUEST, props<{ exerciseId: string}>())
export const GET_AUTHENTICATED_USER_EXERCISE_DETAILS_SUCCESS = 'GET AUTHENTICATED USER EXERCISE DETAILS Success'
export const getAuthenticatedUserExerciseDetailsRequestSuccess = createAction(GET_AUTHENTICATED_USER_EXERCISE_DETAILS_SUCCESS, props<{ exercise: Exercise}>())
export const GET_AUTHENTICATED_USER_EXERCISE_DETAILS_ERROR   = 'GET AUTHENTICATED USER EXERCISE DETAILS Error'
export const getAuthenticatedUserExerciseDetailsRequestError = createAction(GET_AUTHENTICATED_USER_EXERCISE_DETAILS_ERROR, props<{ exerciseId: string}>())
export const GET_ANONYMOUS_USER_EXERCISE_DETAILS_REQUEST = 'GET ANONYMOUS USER EXERCISE DETAILS Request'
export const getAnonymousUserExerciseDetailsRequest = createAction(GET_ANONYMOUS_USER_EXERCISE_DETAILS_REQUEST, props<{ exerciseId: string}>())
export const GET_ANONYMOUS_USER_EXERCISE_DETAILS_SUCCESS = 'GET ANONYMOUS USER EXERCISE DETAILS Success'
export const getAnonymousUserExerciseDetailsRequestSuccess = createAction(GET_ANONYMOUS_USER_EXERCISE_DETAILS_SUCCESS, props<{ exercise: Exercise}>())
export const GET_ANONYMOUS_USER_EXERCISE_DETAILS_ERROR   = 'GET ANONYMOUS USER EXERCISE DETAILS Error'
export const getAnonymousUserExerciseDetailsRequestError = createAction(GET_ANONYMOUS_USER_EXERCISE_DETAILS_ERROR, props<{ exerciseId: string}>())