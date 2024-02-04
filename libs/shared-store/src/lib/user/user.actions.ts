import { createAction, props } from "@ngrx/store"
import { User } from '@angular/fire/auth';

export const SET_USER = 'SET_USER'
export const setUser = createAction(SET_USER, props<{ user: User }>())


export const LOGOUT = "LOGOUT_USER"
export const logOutRequest = createAction(LOGOUT)
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const loginRequest = createAction(LOGIN_REQUEST, props<{ userEmail: string, userPass: string}>())
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const loginRequestSuccess = createAction(LOGIN_SUCCESS)
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const loginRequestError = createAction(LOGIN_ERROR)
  