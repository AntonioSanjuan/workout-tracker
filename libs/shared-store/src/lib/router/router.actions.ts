import { createAction, props } from "@ngrx/store"

export const SET_CURRENT_ROUTE = 'SET CURRENT ROUTE'
export const setCurrentRoute = createAction(SET_CURRENT_ROUTE, props<{ currentRoute: string}>())
