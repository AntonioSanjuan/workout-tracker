import { createAction, props } from "@ngrx/store"
import { Exercise, MusclesInvolved } from "@workout-tracker/models"
import firebase from 'firebase/compat/app';

export const GET_USER_EXERCISES_REQUEST = 'GET USER EXERCISES'
export const getUserExercisesRequest = createAction(GET_USER_EXERCISES_REQUEST)
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
export const GET_ANONYMOUS_USER_EXERCISES_ERROR = 'GET ANONYMOUS USER EXERCISES Error'
export const getAnonymousUserExercisesRequestError = createAction(GET_ANONYMOUS_USER_EXERCISES_ERROR, props<{ error: firebase.FirebaseError }>())

export const ADD_USER_EXERCISE_REQUEST = 'ADD USER EXERCISE'
export const addUserExerciseRequest = createAction(ADD_USER_EXERCISE_REQUEST, props<{ exercise: Exercise }>())
export const ADD_AUTHENTICATED_USER_EXERCISE_REQUEST = 'ADD AUTHENTICATED USER EXERCISE Request'
export const addAuthenticatedUserExerciseRequest = createAction(ADD_AUTHENTICATED_USER_EXERCISE_REQUEST, props<{ exercise: Exercise }>())
export const ADD_AUTHENTICATED_USER_EXERCISE_SUCCESS = 'ADD AUTHENTICATED USER EXERCISE Success'
export const addAuthenticatedUserExerciseRequestSuccess = createAction(ADD_AUTHENTICATED_USER_EXERCISE_SUCCESS, props<{ exercise: Exercise }>())
export const ADD_AUTHENTICATED_USER_EXERCISE_ERROR = 'ADD AUTHENTICATED USER EXERCISE Error'
export const addAuthenticatedUserExerciseRequestError = createAction(ADD_AUTHENTICATED_USER_EXERCISE_ERROR, props<{ error: firebase.FirebaseError }>())
export const ADD_ANONYMOUS_USER_EXERCISE_REQUEST = 'ADD ANONYMOUS USER EXERCISE Request'
export const addAnonymousUserExerciseRequest = createAction(ADD_ANONYMOUS_USER_EXERCISE_REQUEST, props<{ exercise: Exercise }>())
export const ADD_ANONYMOUS_USER_EXERCISE_SUCCESS = 'ADD ANONYMOUS USER EXERCISE Success'
export const addAnonymousUserExerciseRequestSuccess = createAction(ADD_ANONYMOUS_USER_EXERCISE_SUCCESS, props<{ exercise: Exercise }>())
export const ADD_ANONYMOUS_USER_EXERCISE_ERROR = 'ADD ANONYMOUS USER EXERCISE Error'
export const addAnonymousUserExerciseRequestError = createAction(ADD_ANONYMOUS_USER_EXERCISE_ERROR, props<{ error: firebase.FirebaseError }>())

export const SET_EXERCISE_MUSCLE_INVOLVED_QUERY_FILTER = 'SET EXERCISE TYPE QUERY FILTER'
export const setExerciseMuscleInvolvedQueryFilter = createAction(SET_EXERCISE_MUSCLE_INVOLVED_QUERY_FILTER, props<{ muscleInvolved: MusclesInvolved}>())
export const SET_EXERCISE_NAME_QUERY_FILTER = 'SET EXERCISE NAME QUERY FILTER'
export const setExerciseNameQueryFilter = createAction(SET_EXERCISE_NAME_QUERY_FILTER, props<{ exerciseName: string}>())
export const CLEAR_EXERCISE_QUERY_FILTER = 'CLEAR EXERCISE QUERY FILTER'
export const clearExerciseQueryFilter = createAction(CLEAR_EXERCISE_QUERY_FILTER)
