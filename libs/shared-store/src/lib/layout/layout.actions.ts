import { createAction } from "@ngrx/store"

export const SWITCH_NAVBAR = 'SWITCH_NAVBAR'
export const switchNavBar = createAction(SWITCH_NAVBAR)
export const CLOSE_NAVBAR = 'CLOSE_NAVBAR'
export const closeNavBar = createAction(CLOSE_NAVBAR)
