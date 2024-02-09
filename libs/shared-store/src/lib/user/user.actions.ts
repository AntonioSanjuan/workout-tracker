import { createAction, props } from "@ngrx/store"
import { User } from '@angular/fire/auth';
import firebase from 'firebase/compat/app/';

export const LOGOUT = "LOGOUT_USER"
export const logOutRequest = createAction(LOGOUT)
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const loginRequest = createAction(LOGIN_REQUEST, props<{ userEmail: string, userPass: string}>())
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const loginRequestSuccess = createAction(LOGIN_SUCCESS)
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const loginRequestError = createAction(LOGIN_ERROR, props<{ error: firebase.FirebaseError }>())
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const signUpRequest = createAction(SIGNUP_REQUEST, props<{ userEmail: string, userPass: string}>())
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const signUpRequestSuccess = createAction(SIGNUP_SUCCESS)
export const SIGNUP_ERROR = 'SIGNUP_ERROR'
export const signUpRequestError = createAction(SIGNUP_ERROR, props<{ error: firebase.FirebaseError }>())
  
export const SET_USER = 'SET_USER'
export const setUserData = createAction(SET_USER, props<{ user: firebase.User, isNewUser: boolean }>())
export const SET_ANONYMOUS_USER = 'SET_ANONYMOUS_USER'
export const setAnonymousUserData = createAction(SET_ANONYMOUS_USER)
