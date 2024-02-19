import { createAction, props } from "@ngrx/store"
import firebase from 'firebase/compat/app/';
import { UserSettings } from "@workout-tracker/models";

export const LOGOUT = "LOGOUT_USER"
export const logOutRequest = createAction(LOGOUT)
export const LOGIN_REQUEST = 'LOGIN Request'
export const loginRequest = createAction(LOGIN_REQUEST, props<{ userEmail: string, userPass: string}>())
export const LOGIN_SUCCESS = 'LOGIN Success'
export const loginRequestSuccess = createAction(LOGIN_SUCCESS, props<{ credentials: firebase.auth.UserCredential }>())
export const LOGIN_ERROR = 'LOGIN Error'
export const loginRequestError = createAction(LOGIN_ERROR, props<{ error: firebase.FirebaseError }>())
export const LOGIN_GOOGLE_REQUEST = 'LOGIN Google Request'
export const loginGoogleRequest = createAction(LOGIN_GOOGLE_REQUEST)
export const LOGIN_GOOGLE_SUCCESS = 'LOGIN Google Success'
export const loginGoogleRequestSuccess = createAction(LOGIN_GOOGLE_SUCCESS, props<{ credentials: firebase.auth.UserCredential }>())
export const LOGIN_GOOGLE_ERROR = 'LOGIN Google Error'
export const loginGoogleRequestError = createAction(LOGIN_GOOGLE_ERROR, props<{ error: firebase.FirebaseError }>())
export const SIGNUP_REQUEST = 'SIGNUP Request'
export const signUpRequest = createAction(SIGNUP_REQUEST, props<{ userEmail: string, userPass: string}>())
export const SIGNUP_SUCCESS = 'SIGNUP Success'
export const signUpRequestSuccess = createAction(SIGNUP_SUCCESS, props<{ credentials: firebase.auth.UserCredential }>())
export const SIGNUP_ERROR = 'SIGNUP Error'
export const signUpRequestError = createAction(SIGNUP_ERROR, props<{ error: firebase.FirebaseError }>())
  
  
export const SET_USER_INFO = 'SET USER INFO'
export const setUserInfo = createAction(SET_USER_INFO, props<{ isNewUser: boolean, userName: string|undefined }>())
export const SET_AUTHENTICATED_USER = 'SET AUTHENTICATED USER'
export const setAuthenticatedUser = createAction(SET_AUTHENTICATED_USER, props<{ user: firebase.User }>())
export const SET_ANONYMOUS_USER = 'SET ANONYMOUS USER'
export const setAnonymousUser = createAction(SET_ANONYMOUS_USER)

export const GET_AUTHENTICATED_USER_DATA_REQUEST = 'GET AUTHENTICATED USER DATA Request'
export const getAuthenticatedUserDataRequest = createAction(GET_AUTHENTICATED_USER_DATA_REQUEST, props<{ user: firebase.User }>())
export const GET_AUTHENTICATED_USER_DATA_SUCCESS = 'GET AUTHENTICATED USER DATA Success'
export const getAuthenticatedUserDataRequestSuccess = createAction(GET_AUTHENTICATED_USER_DATA_SUCCESS, props<{ userSettings: UserSettings }>())
export const GET_ANONYMOUS_USER_DATA_REQUEST = 'GET ANONYMOUS USER DATA Request'
export const getAnonymousUserDataRequest = createAction(GET_ANONYMOUS_USER_DATA_REQUEST)
export const GET_ANONYMOUS_USER_DATA_SUCCESS = 'GET ANONYMOUS USER DATA Success'
export const getAnonymousUserDataRequestSuccess = createAction(GET_ANONYMOUS_USER_DATA_SUCCESS, props<{ userSettings: UserSettings }>())

export const UPDATE_USER_DATA_REQUEST = 'UPDATE USER DATA Request'
export const updateUserDataRequest = createAction(UPDATE_USER_DATA_REQUEST, props<{ userSettings: UserSettings }>())
export const UPDATE_USER_DATA_SUCCESS = 'UPDATE USER DATA Success'
export const updateUserDataRequestSuccess = createAction(UPDATE_USER_DATA_SUCCESS, props<{ userSettings: UserSettings }>())

