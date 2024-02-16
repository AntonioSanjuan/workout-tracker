import { createAction, props } from "@ngrx/store"
import firebase from 'firebase/compat/app/';
import { UserSettings } from "@workout-tracker/models";

export const LOGOUT = "LOGOUT_USER"
export const logOutRequest = createAction(LOGOUT)
export const LOGIN_REQUEST = 'LOGIN Request'
export const loginRequest = createAction(LOGIN_REQUEST, props<{ userEmail: string, userPass: string}>())
export const LOGIN_SUCCESS = 'LOGIN Success'
export const loginRequestSuccess = createAction(LOGIN_SUCCESS)
export const LOGIN_ERROR = 'LOGIN Error'
export const loginRequestError = createAction(LOGIN_ERROR, props<{ error: firebase.FirebaseError }>())
export const SIGNUP_REQUEST = 'SIGNUP Request'
export const signUpRequest = createAction(SIGNUP_REQUEST, props<{ userEmail: string, userPass: string}>())
export const SIGNUP_SUCCESS = 'SIGNUP Success'
export const signUpRequestSuccess = createAction(SIGNUP_SUCCESS)
export const SIGNUP_ERROR = 'SIGNUP Error'
export const signUpRequestError = createAction(SIGNUP_ERROR, props<{ error: firebase.FirebaseError }>())
  
export const AUTHENTICATED_USER_DATA_REQUEST = 'AUTHENTICATED_USER_DATA Request'
export const authenticatedUserDataRequest = createAction(AUTHENTICATED_USER_DATA_REQUEST, props<{ user: firebase.User, isNewUser: boolean }>())
export const ANONYMOUS_USER_DATA_REQUEST = 'ANONYMOUS_USER_DATA Request'
export const anonymousUserDataRequest = createAction(ANONYMOUS_USER_DATA_REQUEST)

export const UPDATE_USER_SETTINGS = 'UPDATE_USER_SETTINGS Request'
export const updateUserSettings = createAction(UPDATE_USER_SETTINGS, props<{ userSettings: UserSettings }>())

export const SET_USER_SETTINGS_SUCCESS = 'SET_USER_SETTINGS Success'
export const setUserSettingsSuccess = createAction(SET_USER_SETTINGS_SUCCESS, props<{ userSettings: UserSettings }>())
