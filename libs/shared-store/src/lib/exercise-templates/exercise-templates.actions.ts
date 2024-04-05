import { createAction, props } from "@ngrx/store"
import { ExerciseTemplate, MusclesInvolved } from "@workout-tracker/models"
import firebase from 'firebase/compat/app';

export const GET_USER_EXERCISE_TEMPLATES_REQUEST = 'GET USER EXERCISE TEMPLATES'
export const getUserExerciseTemplatesRequest = createAction(GET_USER_EXERCISE_TEMPLATES_REQUEST)
export const GET_AUTHENTICATED_USER_EXERCISE_TEMPLATES_REQUEST = 'GET AUTHENTICATED USER EXERCISE TEMPLATES Request'
export const getAuthenticatedUserExerciseTemplatesRequest = createAction(GET_AUTHENTICATED_USER_EXERCISE_TEMPLATES_REQUEST)
export const GET_AUTHENTICATED_USER_EXERCISE_TEMPLATES_SUCCESS = 'GET AUTHENTICATED USER EXERCISE TEMPLATES Success'
export const getAuthenticatedUserExerciseTemplatesRequestSuccess = createAction(GET_AUTHENTICATED_USER_EXERCISE_TEMPLATES_SUCCESS, props<{ exercises: ExerciseTemplate[] }>())
export const GET_AUTHENTICATED_USER_EXERCISE_TEMPLATES_ERROR = 'GET AUTHENTICATED USER EXERCISE TEMPLATES Error'
export const getAuthenticatedUserExerciseTemplatesRequestError = createAction(GET_AUTHENTICATED_USER_EXERCISE_TEMPLATES_ERROR, props<{ error: firebase.FirebaseError }>())
export const GET_ANONYMOUS_USER_EXERCISE_TEMPLATES_REQUEST = 'GET ANONYMOUS USER EXERCISE TEMPLATES Request'
export const getAnonymousUserExerciseTemplatesRequest = createAction(GET_ANONYMOUS_USER_EXERCISE_TEMPLATES_REQUEST)
export const GET_ANONYMOUS_USER_EXERCISE_TEMPLATES_SUCCESS = 'GET ANONYMOUS USER EXERCISE TEMPLATES Success'
export const getAnonymousUserExerciseTemplatesRequestSuccess = createAction(GET_ANONYMOUS_USER_EXERCISE_TEMPLATES_SUCCESS, props<{ exercises: ExerciseTemplate[] }>())
export const GET_ANONYMOUS_USER_EXERCISE_TEMPLATES_ERROR = 'GET ANONYMOUS USER EXERCISE TEMPLATES Error'
export const getAnonymousUserExerciseTemplatesRequestError = createAction(GET_ANONYMOUS_USER_EXERCISE_TEMPLATES_ERROR, props<{ error: firebase.FirebaseError }>())

export const ADD_USER_EXERCISE_TEMPLATE_REQUEST = 'ADD USER EXERCISE TEMPLATE'
export const addUserExerciseTemplateRequest = createAction(ADD_USER_EXERCISE_TEMPLATE_REQUEST, props<{ exercise: ExerciseTemplate }>())
export const ADD_AUTHENTICATED_USER_EXERCISE_TEMPLATE_REQUEST = 'ADD AUTHENTICATED USER EXERCISE TEMPLATE Request'
export const addAuthenticatedUserExerciseTemplateRequest = createAction(ADD_AUTHENTICATED_USER_EXERCISE_TEMPLATE_REQUEST, props<{ exercise: ExerciseTemplate }>())
export const ADD_AUTHENTICATED_USER_EXERCISE_TEMPLATE_SUCCESS = 'ADD AUTHENTICATED USER EXERCISE TEMPLATE Success'
export const addAuthenticatedUserExerciseTemplateRequestSuccess = createAction(ADD_AUTHENTICATED_USER_EXERCISE_TEMPLATE_SUCCESS, props<{ exercise: ExerciseTemplate }>())
export const ADD_AUTHENTICATED_USER_EXERCISE_TEMPLATE_ERROR = 'ADD AUTHENTICATED USER EXERCISE TEMPLATE Error'
export const addAuthenticatedUserExerciseTemplateRequestError = createAction(ADD_AUTHENTICATED_USER_EXERCISE_TEMPLATE_ERROR, props<{ error: firebase.FirebaseError }>())
export const ADD_ANONYMOUS_USER_EXERCISE_TEMPLATE_REQUEST = 'ADD ANONYMOUS USER EXERCISE TEMPLATE Request'
export const addAnonymousUserExerciseTemplateRequest = createAction(ADD_ANONYMOUS_USER_EXERCISE_TEMPLATE_REQUEST, props<{ exercise: ExerciseTemplate }>())
export const ADD_ANONYMOUS_USER_EXERCISE_TEMPLATE_SUCCESS = 'ADD ANONYMOUS USER EXERCISE TEMPLATE Success'
export const addAnonymousUserExerciseTemplateRequestSuccess = createAction(ADD_ANONYMOUS_USER_EXERCISE_TEMPLATE_SUCCESS, props<{ exercise: ExerciseTemplate }>())
export const ADD_ANONYMOUS_USER_EXERCISE_TEMPLATE_ERROR = 'ADD ANONYMOUS USER EXERCISE TEMPLATE Error'
export const addAnonymousUserExerciseTemplateRequestError = createAction(ADD_ANONYMOUS_USER_EXERCISE_TEMPLATE_ERROR, props<{ error: firebase.FirebaseError }>())

export const SET_EXERCISE_TEMPLATE_MUSCLE_INVOLVED_QUERY_FILTER = 'SET EXERCISE TEMPLATE TYPE QUERY FILTER'
export const setExerciseTemplateMuscleInvolvedQueryFilter = createAction(SET_EXERCISE_TEMPLATE_MUSCLE_INVOLVED_QUERY_FILTER, props<{ muscleInvolved: MusclesInvolved}>())
export const SET_EXERCISE_TEMPLATE_NAME_QUERY_FILTER = 'SET EXERCISE TEMPLATE NAME QUERY FILTER'
export const setExerciseTemplateNameQueryFilter = createAction(SET_EXERCISE_TEMPLATE_NAME_QUERY_FILTER, props<{ exerciseName: string}>())
export const CLEAR_EXERCISE_TEMPLATE_QUERY_FILTER = 'CLEAR EXERCISE TEMPLATE QUERY FILTER'
export const clearExerciseTemplateQueryFilter = createAction(CLEAR_EXERCISE_TEMPLATE_QUERY_FILTER)
