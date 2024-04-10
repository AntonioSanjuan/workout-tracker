import { createAction, props } from "@ngrx/store"
import { Training, TrainingQueryFilters } from "@workout-tracker/models"
import firebase from 'firebase/compat/app';

export const GET_USER_TRAININGS_LIST_REQUEST = 'GET USER TRAININGS LIST'
export const getUserTrainingsListRequest = createAction(GET_USER_TRAININGS_LIST_REQUEST)
export const GET_AUTHENTICATED_USER_TRAININGS_LIST_REQUEST = 'GET AUTHENTICATED USER TRAININGS LIST Request'
export const getAuthenticatedUserTrainingsListRequest = createAction(GET_AUTHENTICATED_USER_TRAININGS_LIST_REQUEST)
export const GET_AUTHENTICATED_USER_TRAININGS_LIST_SUCCESS = 'GET AUTHENTICATED USER TRAININGS LIST Success'
export const getAuthenticatedUserTrainingsListRequestSuccess = createAction(GET_AUTHENTICATED_USER_TRAININGS_LIST_SUCCESS, props<{ trainings: Training[] }>())
export const GET_AUTHENTICATED_USER_TRAININGS_LIST_ERROR = 'GET AUTHENTICATED USER TRAININGS LIST Error'
export const getAuthenticatedUserTrainingsListRequestError = createAction(GET_AUTHENTICATED_USER_TRAININGS_LIST_ERROR, props<{ error: firebase.FirebaseError }>())
export const GET_ANONYMOUS_USER_TRAININGS_LIST_REQUEST = 'GET ANONYMOUS USER TRAININGS LIST Request'
export const getAnonymousUserTrainingsListRequest = createAction(GET_ANONYMOUS_USER_TRAININGS_LIST_REQUEST)
export const GET_ANONYMOUS_USER_TRAININGS_LIST_SUCCESS = 'GET ANONYMOUS USER TRAININGS LIST Success'
export const getAnonymousUserTrainingsListRequestSuccess = createAction(GET_ANONYMOUS_USER_TRAININGS_LIST_SUCCESS, props<{ trainings: Training[] }>())
export const GET_ANONYMOUS_USER_TRAININGS_LIST_ERROR = 'GET ANONYMOUS USER TRAININGS LIST Error'
export const getAnonymousUserTrainingsListRequestError = createAction(GET_ANONYMOUS_USER_TRAININGS_LIST_ERROR, props<{ error: firebase.FirebaseError }>())

export const ADD_USER_TRAINING_LIST_REQUEST = 'ADD USER TRAINING LIST'
export const addUserTrainingListRequest = createAction(ADD_USER_TRAINING_LIST_REQUEST, props<{ training: Training }>())
export const ADD_AUTHENTICATED_USER_TRAINING_LIST_REQUEST = 'ADD AUTHENTICATED USER TRAINING LIST Request'
export const addAuthenticatedUserTrainingListRequest = createAction(ADD_AUTHENTICATED_USER_TRAINING_LIST_REQUEST, props<{ training: Training }>())
export const ADD_AUTHENTICATED_USER_TRAINING_LIST_SUCCESS = 'ADD AUTHENTICATED USER TRAINING LIST Success'
export const addAuthenticatedUserTrainingListRequestSuccess = createAction(ADD_AUTHENTICATED_USER_TRAINING_LIST_SUCCESS, props<{ training: Training }>())
export const ADD_AUTHENTICATED_USER_TRAINING_LIST_ERROR = 'ADD AUTHENTICATED USER TRAINING LIST Error'
export const addAuthenticatedUserTrainingListRequestError = createAction(ADD_AUTHENTICATED_USER_TRAINING_LIST_ERROR, props<{ error: firebase.FirebaseError }>())
export const ADD_ANONYMOUS_USER_TRAINING_LIST_REQUEST = 'ADD ANONYMOUS USER TRAINING LIST Request'
export const addAnonymousUserTrainingListRequest = createAction(ADD_ANONYMOUS_USER_TRAINING_LIST_REQUEST, props<{ training: Training }>())
export const ADD_ANONYMOUS_USER_TRAINING_LIST_SUCCESS = 'ADD ANONYMOUS USER TRAINING LIST Success'
export const addAnonymousUserTrainingListRequestSuccess = createAction(ADD_ANONYMOUS_USER_TRAINING_LIST_SUCCESS, props<{ training: Training }>())
export const ADD_ANONYMOUS_USER_TRAINING_LIST_ERROR = 'ADD ANONYMOUS USER TRAINING LIST Error'
export const addAnonymousUserTrainingListRequestError = createAction(ADD_ANONYMOUS_USER_TRAINING_LIST_ERROR, props<{ error: firebase.FirebaseError }>())

export const UPDATE_USER_TRAINING_LIST_REQUEST = 'UPDATE USER TRAINING LIST'
export const updateUserTrainingListRequest = createAction(UPDATE_USER_TRAINING_LIST_REQUEST, props<{ training: Training }>())
export const UPDATE_AUTHENTICATED_USER_TRAINING_LIST_REQUEST = 'UPDATE AUTHENTICATED USER TRAINING LIST Request'
export const updateAuthenticatedUserTrainingListRequest = createAction(UPDATE_AUTHENTICATED_USER_TRAINING_LIST_REQUEST, props<{ training: Training }>())
export const UPDATE_AUTHENTICATED_USER_TRAINING_LIST_SUCCESS = 'UPDATE AUTHENTICATED USER TRAINING LIST Success'
export const updateAuthenticatedUserTrainingListRequestSuccess = createAction(UPDATE_AUTHENTICATED_USER_TRAINING_LIST_SUCCESS, props<{ training: Training }>())
export const UPDATE_AUTHENTICATED_USER_TRAINING_LIST_ERROR = 'UPDATE AUTHENTICATED USER TRAINING LIST Error'
export const updateAuthenticatedUserTrainingListRequestError = createAction(UPDATE_AUTHENTICATED_USER_TRAINING_LIST_ERROR, props<{ error: firebase.FirebaseError }>())
export const UPDATE_ANONYMOUS_USER_TRAINING_LIST_REQUEST = 'UPDATE ANONYMOUS USER TRAINING LIST Request'
export const updateAnonymousUserTrainingListRequest = createAction(UPDATE_ANONYMOUS_USER_TRAINING_LIST_REQUEST, props<{ training: Training }>())
export const UPDATE_ANONYMOUS_USER_TRAINING_LIST_SUCCESS = 'UPDATE ANONYMOUS USER TRAINING LIST Success'
export const updateAnonymousUserTrainingListRequestSuccess = createAction(UPDATE_ANONYMOUS_USER_TRAINING_LIST_SUCCESS, props<{ training: Training }>())
export const UPDATE_ANONYMOUS_USER_TRAINING_LIST_ERROR = 'UPDATE ANONYMOUS USER TRAINING LIST Error'
export const updateAnonymousUserTrainingListRequestError = createAction(UPDATE_ANONYMOUS_USER_TRAINING_LIST_ERROR, props<{ error: firebase.FirebaseError }>())

export const SET_TRAINING_LIST_QUERY_FILTER = 'SET TRAINING LIST QUERY FILTER'
export const setTrainingListQueryFilter = createAction(SET_TRAINING_LIST_QUERY_FILTER, props<{ filters: TrainingQueryFilters}>())
export const CLEAR_TRAINING_LIST_QUERY_FILTER = 'CLEAR TRAINING LIST QUERY FILTER'
export const clearTrainingListQueryFilter = createAction(CLEAR_TRAINING_LIST_QUERY_FILTER)
