import { createAction, props } from "@ngrx/store"
import { ExerciseEquipment, ExerciseTemplate, MusclesInvolved } from "@workout-tracker/models"
import firebase from 'firebase/compat/app';

export const GET_USER_EXERCISE_TEMPLATES_LIST_REQUEST = 'GET USER EXERCISE TEMPLATES LIST'
export const getUserExerciseTemplatesListRequest = createAction(GET_USER_EXERCISE_TEMPLATES_LIST_REQUEST)
export const GET_AUTHENTICATED_USER_EXERCISE_TEMPLATES_LIST_REQUEST = 'GET AUTHENTICATED USER EXERCISE TEMPLATES LIST Request'
export const getAuthenticatedUserExerciseTemplatesListRequest = createAction(GET_AUTHENTICATED_USER_EXERCISE_TEMPLATES_LIST_REQUEST)
export const GET_AUTHENTICATED_USER_EXERCISE_TEMPLATES_LIST_SUCCESS = 'GET AUTHENTICATED USER EXERCISE TEMPLATES LIST Success'
export const getAuthenticatedUserExerciseTemplatesListRequestSuccess = createAction(GET_AUTHENTICATED_USER_EXERCISE_TEMPLATES_LIST_SUCCESS, props<{ exercises: ExerciseTemplate[] }>())
export const GET_AUTHENTICATED_USER_EXERCISE_TEMPLATES_LIST_ERROR = 'GET AUTHENTICATED USER EXERCISE TEMPLATES LIST Error'
export const getAuthenticatedUserExerciseTemplatesListRequestError = createAction(GET_AUTHENTICATED_USER_EXERCISE_TEMPLATES_LIST_ERROR, props<{ error: firebase.FirebaseError }>())
export const GET_ANONYMOUS_USER_EXERCISE_TEMPLATES_LIST_REQUEST = 'GET ANONYMOUS USER EXERCISE TEMPLATES LIST Request'
export const getAnonymousUserExerciseTemplatesListRequest = createAction(GET_ANONYMOUS_USER_EXERCISE_TEMPLATES_LIST_REQUEST)
export const GET_ANONYMOUS_USER_EXERCISE_TEMPLATES_LIST_SUCCESS = 'GET ANONYMOUS USER EXERCISE TEMPLATES LIST Success'
export const getAnonymousUserExerciseTemplatesListRequestSuccess = createAction(GET_ANONYMOUS_USER_EXERCISE_TEMPLATES_LIST_SUCCESS, props<{ exercises: ExerciseTemplate[] }>())
export const GET_ANONYMOUS_USER_EXERCISE_TEMPLATES_LIST_ERROR = 'GET ANONYMOUS USER EXERCISE TEMPLATES LIST Error'
export const getAnonymousUserExerciseTemplatesListRequestError = createAction(GET_ANONYMOUS_USER_EXERCISE_TEMPLATES_LIST_ERROR, props<{ error: firebase.FirebaseError }>())

export const ADD_USER_EXERCISE_TEMPLATE_LIST_REQUEST = 'ADD USER EXERCISE TEMPLATE LIST'
export const addUserExerciseTemplateListRequest = createAction(ADD_USER_EXERCISE_TEMPLATE_LIST_REQUEST, props<{ exercise: ExerciseTemplate }>())
export const ADD_AUTHENTICATED_USER_EXERCISE_TEMPLATE_LIST_REQUEST = 'ADD AUTHENTICATED USER EXERCISE TEMPLATE LIST Request'
export const addAuthenticatedUserExerciseTemplateListRequest = createAction(ADD_AUTHENTICATED_USER_EXERCISE_TEMPLATE_LIST_REQUEST, props<{ exercise: ExerciseTemplate }>())
export const ADD_AUTHENTICATED_USER_EXERCISE_TEMPLATE_LIST_SUCCESS = 'ADD AUTHENTICATED USER EXERCISE TEMPLATE LIST Success'
export const addAuthenticatedUserExerciseTemplateListRequestSuccess = createAction(ADD_AUTHENTICATED_USER_EXERCISE_TEMPLATE_LIST_SUCCESS, props<{ exercise: ExerciseTemplate }>())
export const ADD_AUTHENTICATED_USER_EXERCISE_TEMPLATE_LIST_ERROR = 'ADD AUTHENTICATED USER EXERCISE TEMPLATE LIST Error'
export const addAuthenticatedUserExerciseTemplateListRequestError = createAction(ADD_AUTHENTICATED_USER_EXERCISE_TEMPLATE_LIST_ERROR, props<{ error: firebase.FirebaseError }>())
export const ADD_ANONYMOUS_USER_EXERCISE_TEMPLATE_LIST_REQUEST = 'ADD ANONYMOUS USER EXERCISE TEMPLATE LIST Request'
export const addAnonymousUserExerciseTemplateListRequest = createAction(ADD_ANONYMOUS_USER_EXERCISE_TEMPLATE_LIST_REQUEST, props<{ exercise: ExerciseTemplate }>())
export const ADD_ANONYMOUS_USER_EXERCISE_TEMPLATE_LIST_SUCCESS = 'ADD ANONYMOUS USER EXERCISE TEMPLATE LIST Success'
export const addAnonymousUserExerciseTemplateListRequestSuccess = createAction(ADD_ANONYMOUS_USER_EXERCISE_TEMPLATE_LIST_SUCCESS, props<{ exercise: ExerciseTemplate }>())
export const ADD_ANONYMOUS_USER_EXERCISE_TEMPLATE_LIST_ERROR = 'ADD ANONYMOUS USER EXERCISE TEMPLATE LIST Error'
export const addAnonymousUserExerciseTemplateListRequestError = createAction(ADD_ANONYMOUS_USER_EXERCISE_TEMPLATE_LIST_ERROR, props<{ error: firebase.FirebaseError }>())

export const ADD_DEFAULT_EXERCISE_TEMPLATES_LIST = 'ADD DEFAULT EXERCISE TEMPLATES LIST'
export const addDefaultExerciseTemplateList = createAction(ADD_DEFAULT_EXERCISE_TEMPLATES_LIST)

export const SET_EXERCISE_TEMPLATE_LIST_MUSCLE_INVOLVED_QUERY_FILTER = 'SET EXERCISE TEMPLATE LIST MUSCLE INVOLVED QUERY FILTER'
export const setExerciseTemplateListMuscleInvolvedQueryFilter = createAction(SET_EXERCISE_TEMPLATE_LIST_MUSCLE_INVOLVED_QUERY_FILTER, props<{ muscleInvolved: MusclesInvolved}>())
export const SET_EXERCISE_TEMPLATE_LIST_EQUIPMENT_QUERY_FILTER = 'SET EXERCISE TEMPLATE LIST EQUIPMENT QUERY FILTER'
export const setExerciseTemplateListEquipmentQueryFilter = createAction(SET_EXERCISE_TEMPLATE_LIST_EQUIPMENT_QUERY_FILTER, props<{ equipment: ExerciseEquipment}>())
export const SET_EXERCISE_TEMPLATE_LIST_NAME_QUERY_FILTER = 'SET EXERCISE TEMPLATE LIST NAME QUERY FILTER'
export const setExerciseTemplateListNameQueryFilter = createAction(SET_EXERCISE_TEMPLATE_LIST_NAME_QUERY_FILTER, props<{ exerciseName: string}>())
export const CLEAR_EXERCISE_TEMPLATE_LIST_QUERY_FILTER = 'CLEAR EXERCISE TEMPLATE LIST QUERY FILTER'
export const clearExerciseTemplateListQueryFilter = createAction(CLEAR_EXERCISE_TEMPLATE_LIST_QUERY_FILTER)
