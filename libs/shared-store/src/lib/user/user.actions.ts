import { createAction, props } from "@ngrx/store"

export const SET_USER = 'SET_USER'
export const setUser = createAction(SET_USER, props<{ user: any }>())
export const CLEAR_USER = 'CLEAR_USER'
export const clearUser = createAction(CLEAR_USER)
