import { createAction, props } from "@ngrx/store"
import { User } from '@angular/fire/auth';

export const SET_USER = 'SET_USER'
export const setUser = createAction(SET_USER, props<{ user: User }>())
export const CLEAR_USER = 'CLEAR_USER'
export const clearUser = createAction(CLEAR_USER)
