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
  
export const FETCH_AUTHENTICATED_USER = 'FETCH_AUTHENTICATED_USER Request'
export const fetchAuthenticatedUserData = createAction(FETCH_AUTHENTICATED_USER, props<{ user: firebase.User, isNewUser: boolean }>())
export const FETCH_ANONYMOUS_USER = 'FETCH_ANONYMOUS_USER Request'
export const fetchAnonymousUserData = createAction(FETCH_ANONYMOUS_USER)

export const SET_USER_SETTINGS = 'SET_USER_SETTINGS Success'
export const setUserSettings = createAction(SET_USER_SETTINGS, props<{ userSettings: UserSettings }>())
export const UPDATE_USER_SETTINGS = 'UPDATE_USER_SETTINGS Request'
export const updateUserSettings = createAction(UPDATE_USER_SETTINGS, props<{ userSettings: UserSettings }>())