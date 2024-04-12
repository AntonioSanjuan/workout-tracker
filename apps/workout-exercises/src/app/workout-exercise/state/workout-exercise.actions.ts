import { createAction, props } from '@ngrx/store';
import { ExerciseTemplate, Training } from '@workout-tracker/models';

export const GET_USER_EXERCISE_DETAILS_REQUEST = 'GET USER EXERCISE TEMPLATE DETAILS'
export const getUserExerciseDetailsRequest = createAction(GET_USER_EXERCISE_DETAILS_REQUEST, props<{ exerciseId: string}>())
export const GET_AUTHENTICATED_USER_EXERCISE_DETAILS_REQUEST = 'GET AUTHENTICATED USER EXERCISE TEMPLATE DETAILS Request'
export const getAuthenticatedUserExerciseDetailsRequest = createAction(GET_AUTHENTICATED_USER_EXERCISE_DETAILS_REQUEST, props<{ exerciseId: string}>())
export const GET_AUTHENTICATED_USER_EXERCISE_DETAILS_SUCCESS = 'GET AUTHENTICATED USER EXERCISE TEMPLATE DETAILS Success'
export const getAuthenticatedUserExerciseDetailsRequestSuccess = createAction(GET_AUTHENTICATED_USER_EXERCISE_DETAILS_SUCCESS, props<{ exercise: ExerciseTemplate}>())
export const GET_AUTHENTICATED_USER_EXERCISE_DETAILS_ERROR   = 'GET AUTHENTICATED USER EXERCISE TEMPLATE DETAILS Error'
export const getAuthenticatedUserExerciseDetailsRequestError = createAction(GET_AUTHENTICATED_USER_EXERCISE_DETAILS_ERROR, props<{ exerciseId: string}>())
export const GET_ANONYMOUS_USER_EXERCISE_DETAILS_REQUEST = 'GET ANONYMOUS USER EXERCISE TEMPLATE DETAILS Request'
export const getAnonymousUserExerciseDetailsRequest = createAction(GET_ANONYMOUS_USER_EXERCISE_DETAILS_REQUEST, props<{ exerciseId: string}>())
export const GET_ANONYMOUS_USER_EXERCISE_DETAILS_SUCCESS = 'GET ANONYMOUS USER EXERCISE TEMPLATE DETAILS Success'
export const getAnonymousUserExerciseDetailsRequestSuccess = createAction(GET_ANONYMOUS_USER_EXERCISE_DETAILS_SUCCESS, props<{ exercise: ExerciseTemplate}>())
export const GET_ANONYMOUS_USER_EXERCISE_DETAILS_ERROR   = 'GET ANONYMOUS USER EXERCISE TEMPLATE DETAILS Error'
export const getAnonymousUserExerciseDetailsRequestError = createAction(GET_ANONYMOUS_USER_EXERCISE_DETAILS_ERROR, props<{ exerciseId: string}>())

//
export const GET_AUTHENTICATED_USER_EXERCISE_TEMPLATE_TRAININGS_DETAILS_REQUEST = 'GET AUTHENTICATED USER EXERCISE TEMPLATE TRAININGS DETAILS Request'
export const getAuthenticatedUserExerciseTemplateTrainingsDetailsRequest = createAction(GET_AUTHENTICATED_USER_EXERCISE_TEMPLATE_TRAININGS_DETAILS_REQUEST, props<{ exerciseTemplateId: string}>())
export const GET_AUTHENTICATED_USER_EXERCISE_TEMPLATE_TRAININGS_DETAILS_SUCCESS = 'GET AUTHENTICATED USER EXERCISE TEMPLATE TRAININGS DETAILS Success'
export const getAuthenticatedUserExerciseTemplateTrainingsDetailsRequestSuccess = createAction(GET_AUTHENTICATED_USER_EXERCISE_TEMPLATE_TRAININGS_DETAILS_SUCCESS, props<{ trainings: Training[]}>())
export const GET_AUTHENTICATED_USER_EXERCISE_TEMPLATE_TRAININGS_DETAILS_ERROR   = 'GET AUTHENTICATED USER EXERCISE TEMPLATE TRAININGS DETAILS Error'
export const getAuthenticatedUserExerciseTemplateTrainingsDetailsRequestError = createAction(GET_AUTHENTICATED_USER_EXERCISE_TEMPLATE_TRAININGS_DETAILS_ERROR, props<{ exerciseTemplateId: string}>())
export const GET_ANONYMOUS_USER_EXERCISE_TEMPLATE_TRAININGS_DETAILS_REQUEST = 'GET ANONYMOUS USER EXERCISE TEMPLATE TRAININGS DETAILS Request'
export const getAnonymousUserExerciseTemplateTrainingsDetailsRequest = createAction(GET_ANONYMOUS_USER_EXERCISE_TEMPLATE_TRAININGS_DETAILS_REQUEST, props<{ exerciseTemplateId: string}>())
export const GET_ANONYMOUS_USER_EXERCISE_TEMPLATE_TRAININGS_DETAILS_SUCCESS = 'GET ANONYMOUS USER EXERCISE TEMPLATE TRAININGS DETAILS Success'
export const getAnonymousUserExerciseTemplateTrainingsDetailsRequestSuccess = createAction(GET_ANONYMOUS_USER_EXERCISE_TEMPLATE_TRAININGS_DETAILS_SUCCESS, props<{ trainings: Training[]}>())
export const GET_ANONYMOUS_USER_EXERCISE_TEMPLATE_TRAININGS_DETAILS_ERROR   = 'GET ANONYMOUS USER EXERCISE TEMPLATE TRAININGS DETAILS Error'
export const getAnonymousUserExerciseTemplateTrainingsDetailsRequestError = createAction(GET_ANONYMOUS_USER_EXERCISE_TEMPLATE_TRAININGS_DETAILS_ERROR, props<{ exerciseId: string}>())