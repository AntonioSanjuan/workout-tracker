import { createAction, props } from '@ngrx/store';
import { ExerciseTemplate, Training } from '@workout-tracker/models';

export const GET_USER_EXERCISE_TEMPLATE_DETAILS_REQUEST = 'GET USER EXERCISE TEMPLATE DETAILS'
export const getUserExerciseTemplateDetailsRequest = createAction(GET_USER_EXERCISE_TEMPLATE_DETAILS_REQUEST, props<{ exerciseId: string}>())
export const GET_AUTHENTICATED_USER_EXERCISE_TEMPLATE_DETAILS_REQUEST = 'GET AUTHENTICATED USER EXERCISE TEMPLATE DETAILS Request'
export const getAuthenticatedUserExerciseTemplateDetailsRequest = createAction(GET_AUTHENTICATED_USER_EXERCISE_TEMPLATE_DETAILS_REQUEST, props<{ exerciseId: string}>())
export const GET_AUTHENTICATED_USER_EXERCISE_TEMPLATE_DETAILS_SUCCESS = 'GET AUTHENTICATED USER EXERCISE TEMPLATE DETAILS Success'
export const getAuthenticatedUserExerciseTemplateDetailsRequestSuccess = createAction(GET_AUTHENTICATED_USER_EXERCISE_TEMPLATE_DETAILS_SUCCESS, props<{ exercise: ExerciseTemplate}>())
export const GET_AUTHENTICATED_USER_EXERCISE_TEMPLATE_DETAILS_ERROR   = 'GET AUTHENTICATED USER EXERCISE TEMPLATE DETAILS Error'
export const getAuthenticatedUserExerciseTemplateDetailsRequestError = createAction(GET_AUTHENTICATED_USER_EXERCISE_TEMPLATE_DETAILS_ERROR, props<{ exerciseId: string}>())
export const GET_ANONYMOUS_USER_EXERCISE_TEMPLATE_DETAILS_REQUEST = 'GET ANONYMOUS USER EXERCISE TEMPLATE DETAILS Request'
export const getAnonymousUserExerciseTemplateDetailsRequest = createAction(GET_ANONYMOUS_USER_EXERCISE_TEMPLATE_DETAILS_REQUEST, props<{ exerciseId: string}>())
export const GET_ANONYMOUS_USER_EXERCISE_TEMPLATE_DETAILS_SUCCESS = 'GET ANONYMOUS USER EXERCISE TEMPLATE DETAILS Success'
export const getAnonymousUserExerciseTemplateDetailsRequestSuccess = createAction(GET_ANONYMOUS_USER_EXERCISE_TEMPLATE_DETAILS_SUCCESS, props<{ exercise: ExerciseTemplate}>())
export const GET_ANONYMOUS_USER_EXERCISE_TEMPLATE_DETAILS_ERROR   = 'GET ANONYMOUS USER EXERCISE TEMPLATE DETAILS Error'
export const getAnonymousUserExerciseTemplateDetailsRequestError = createAction(GET_ANONYMOUS_USER_EXERCISE_TEMPLATE_DETAILS_ERROR, props<{ exerciseId: string}>())

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