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
  
export const SET_USER = 'SET_USER'
export const setUserData = createAction(SET_USER, props<{ user: firebase.User }>())
export const UNSET_USER = 'UNSET_USER'
export const unsetUserData = createAction(UNSET_USER)
