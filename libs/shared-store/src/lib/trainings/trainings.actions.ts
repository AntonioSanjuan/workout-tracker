import { createAction, props } from "@ngrx/store"
import { Training, TrainingQueryFilters } from "@workout-tracker/models"
import firebase from 'firebase/compat/app';

export const GET_USER_TRAININGS_REQUEST = 'GET USER TRAININGS'
export const getUserTrainingsRequest = createAction(GET_USER_TRAININGS_REQUEST)
export const GET_AUTHENTICATED_USER_TRAININGS_REQUEST = 'GET AUTHENTICATED USER TRAININGS Request'
export const getAuthenticatedUserTrainingsRequest = createAction(GET_AUTHENTICATED_USER_TRAININGS_REQUEST)
export const GET_AUTHENTICATED_USER_TRAININGS_SUCCESS = 'GET AUTHENTICATED USER TRAININGS Success'
export const getAuthenticatedUserTrainingsRequestSuccess = createAction(GET_AUTHENTICATED_USER_TRAININGS_SUCCESS, props<{ trainings: Training[] }>())
export const GET_AUTHENTICATED_USER_TRAININGS_ERROR = 'GET AUTHENTICATED USER TRAININGS Error'
export const getAuthenticatedUserTrainingsRequestError = createAction(GET_AUTHENTICATED_USER_TRAININGS_ERROR, props<{ error: firebase.FirebaseError }>())
export const GET_ANONYMOUS_USER_TRAININGS_REQUEST = 'GET ANONYMOUS USER TRAININGS Request'
export const getAnonymousUserTrainingsRequest = createAction(GET_ANONYMOUS_USER_TRAININGS_REQUEST)
export const GET_ANONYMOUS_USER_TRAININGS_SUCCESS = 'GET ANONYMOUS USER TRAININGS Success'
export const getAnonymousUserTrainingsRequestSuccess = createAction(GET_ANONYMOUS_USER_TRAININGS_SUCCESS, props<{ trainings: Training[] }>())
export const GET_ANONYMOUS_USER_TRAININGS_ERROR = 'GET ANONYMOUS USER TRAININGS Error'
export const getAnonymousUserTrainingsRequestError = createAction(GET_ANONYMOUS_USER_TRAININGS_ERROR, props<{ error: firebase.FirebaseError }>())

export const ADD_USER_TRAINING_REQUEST = 'ADD USER TRAINING'
export const addUserTrainingRequest = createAction(ADD_USER_TRAINING_REQUEST, props<{ training: Training }>())
export const ADD_AUTHENTICATED_USER_TRAINING_REQUEST = 'ADD AUTHENTICATED USER TRAINING Request'
export const addAuthenticatedUserTrainingRequest = createAction(ADD_AUTHENTICATED_USER_TRAINING_REQUEST, props<{ training: Training }>())
export const ADD_AUTHENTICATED_USER_TRAINING_SUCCESS = 'ADD AUTHENTICATED USER TRAINING Success'
export const addAuthenticatedUserTrainingRequestSuccess = createAction(ADD_AUTHENTICATED_USER_TRAINING_SUCCESS, props<{ training: Training }>())
export const ADD_AUTHENTICATED_USER_TRAINING_ERROR = 'ADD AUTHENTICATED USER TRAINING Error'
export const addAuthenticatedUserTrainingRequestError = createAction(ADD_AUTHENTICATED_USER_TRAINING_ERROR, props<{ error: firebase.FirebaseError }>())
export const ADD_ANONYMOUS_USER_TRAINING_REQUEST = 'ADD ANONYMOUS USER TRAINING Request'
export const addAnonymousUserTrainingRequest = createAction(ADD_ANONYMOUS_USER_TRAINING_REQUEST, props<{ training: Training }>())
export const ADD_ANONYMOUS_USER_TRAINING_SUCCESS = 'ADD ANONYMOUS USER TRAINING Success'
export const addAnonymousUserTrainingRequestSuccess = createAction(ADD_ANONYMOUS_USER_TRAINING_SUCCESS, props<{ training: Training }>())
export const ADD_ANONYMOUS_USER_TRAINING_ERROR = 'ADD ANONYMOUS USER TRAINING Error'
export const addAnonymousUserTrainingRequestError = createAction(ADD_ANONYMOUS_USER_TRAINING_ERROR, props<{ error: firebase.FirebaseError }>())

export const SET_TRAINING_QUERY_FILTER = 'SET TRAINING QUERY FILTER'
export const setTrainingQueryFilter = createAction(SET_TRAINING_QUERY_FILTER, props<{ filters: TrainingQueryFilters}>())
export const CLEAR_TRAINING_QUERY_FILTER = 'CLEAR TRAINING QUERY FILTER'
export const clearTrainingQueryFilter = createAction(CLEAR_TRAINING_QUERY_FILTER)
