import { createAction, props } from "@ngrx/store"
import { UserSettings } from "@workout-tracker/models"
import firebase from 'firebase/compat/app';

export const GET_USER_SETTINGS_REQUEST = 'GET USER SETTINGS'
export const getUserSettingsRequest = createAction(GET_USER_SETTINGS_REQUEST)
export const GET_AUTHENTICATED_USER_SETTINGS_REQUEST = 'GET AUTHENTICATED USER SETTINGS Request'
export const getAuthenticatedUserSettingsRequest = createAction(GET_AUTHENTICATED_USER_SETTINGS_REQUEST)
export const GET_AUTHENTICATED_USER_DATA_SUCCESS = 'GET AUTHENTICATED USER SETTINGS Success'
export const getAuthenticatedUserSettingsRequestSuccess = createAction(GET_AUTHENTICATED_USER_DATA_SUCCESS, props<{ userSettings: UserSettings }>())
export const GET_AUTHENTICATED_USER_DATA_ERROR = 'GET AUTHENTICATED USER SETTINGS Success'
export const getAuthenticatedUserSettingsRequestError = createAction(GET_AUTHENTICATED_USER_DATA_ERROR, props<{ error: firebase.FirebaseError }>())
export const GET_ANONYMOUS_USER_SETTINGS_REQUEST = 'GET ANONYMOUS USER SETTINGS Request'
export const getAnonymousUserSettingsRequest = createAction(GET_ANONYMOUS_USER_SETTINGS_REQUEST)
export const GET_ANONYMOUS_USER_SETTINGS_SUCCESS = 'GET ANONYMOUS USER SETTINGS Success'
export const getAnonymousUserSettingsRequestSuccess = createAction(GET_ANONYMOUS_USER_SETTINGS_SUCCESS, props<{ userSettings: UserSettings }>())

export const UPDATE_USER_SETTINGS_REQUEST = 'UPDATE USER SETTINGS Request'
export const updateUserSettingsRequest = createAction(UPDATE_USER_SETTINGS_REQUEST, props<{ userSettings: UserSettings }>())
export const UPDATE_USER_SETTINGS_SUCCESS = 'UPDATE USER SETTINGS Success'
export const updateUserSettingsRequestSuccess = createAction(UPDATE_USER_SETTINGS_SUCCESS, props<{ userSettings: UserSettings }>())

