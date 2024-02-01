import { createAction, props } from "@ngrx/store"
import { AppInit } from "./models/app-init-enum"

export const LOADED_APP = "LOADED_APP"
export const loadedApp = createAction(LOADED_APP, props<{ initialized: AppInit}>())
export const UNLOADED_APP = "UNLOADED_APP"
export const unloadedApp = createAction(UNLOADED_APP, props<{ uninitialized: AppInit}>())
export const START_REQUEST = "START_REQUEST"
export const startRequest = createAction(START_REQUEST)
export const END_REQUEST = "END_REQUEST"
export const endRequest = createAction(END_REQUEST)