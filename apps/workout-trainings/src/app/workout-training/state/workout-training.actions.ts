import { createAction, props } from '@ngrx/store';
import { Training } from '@workout-tracker/models';

export const GET_USER_TRAINING_DETAILS_REQUEST = 'GET USER TRAINING DETAILS'
export const getUserTrainingDetailsRequest = createAction(GET_USER_TRAINING_DETAILS_REQUEST, props<{ trainingId: string}>())
export const GET_AUTHENTICATED_USER_TRAINING_DETAILS_REQUEST = 'GET AUTHENTICATED USER TRAINING DETAILS Request'
export const getAuthenticatedUserTrainingDetailsRequest = createAction(GET_AUTHENTICATED_USER_TRAINING_DETAILS_REQUEST, props<{ trainingId: string}>())
export const GET_AUTHENTICATED_USER_TRAINING_DETAILS_SUCCESS = 'GET AUTHENTICATED USER TRAINING DETAILS Success'
export const getAuthenticatedUserTrainingDetailsRequestSuccess = createAction(GET_AUTHENTICATED_USER_TRAINING_DETAILS_SUCCESS, props<{ training: Training}>())
export const GET_AUTHENTICATED_USER_TRAINING_DETAILS_ERROR   = 'GET AUTHENTICATED USER TRAINING DETAILS Error'
export const getAuthenticatedUserTrainingDetailsRequestError = createAction(GET_AUTHENTICATED_USER_TRAINING_DETAILS_ERROR, props<{ trainingId: string}>())
export const GET_ANONYMOUS_USER_TRAINING_DETAILS_REQUEST = 'GET ANONYMOUS USER TRAINING DETAILS Request'
export const getAnonymousUserTrainingDetailsRequest = createAction(GET_ANONYMOUS_USER_TRAINING_DETAILS_REQUEST, props<{ trainingId: string}>())
export const GET_ANONYMOUS_USER_TRAINING_DETAILS_SUCCESS = 'GET ANONYMOUS USER TRAINING DETAILS Success'
export const getAnonymousUserTrainingDetailsRequestSuccess = createAction(GET_ANONYMOUS_USER_TRAINING_DETAILS_SUCCESS, props<{ training: Training}>())
export const GET_ANONYMOUS_USER_TRAINING_DETAILS_ERROR   = 'GET ANONYMOUS USER TRAINING DETAILS Error'
export const getAnonymousUserTrainingDetailsRequestError = createAction(GET_ANONYMOUS_USER_TRAINING_DETAILS_ERROR, props<{ trainingId: string}>())