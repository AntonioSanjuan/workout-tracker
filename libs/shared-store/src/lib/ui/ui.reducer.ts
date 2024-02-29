import { createReducer, on } from "@ngrx/store"
import { endRequest, loadedApp, startRequest, unloadedApp, initializeLoadedApps } from "./ui.actions"
import { UiState } from "./models/uiState.model"
import { uiInitialState } from "./models/uiState.initialState"
import { AppInit } from "./models/app-init-enum";

export const UI_FEATURE_KEY = 'ui';

export const uiReducer = createReducer(
    uiInitialState,
    on(loadedApp, (state: UiState, { initialized }) => {
        return {
            ...state, 
            loadedApps: !state.loadedApps.includes(initialized) ?
                state.loadedApps.concat([initialized]):
                state.loadedApps,
        }
    }),
    on(unloadedApp, (state: UiState, { uninitialized }) => {
        return {
            ...state, 
            loadedApps: state.loadedApps.filter((loadedApps) => loadedApps !== uninitialized)
        }
    }),
    on(initializeLoadedApps, (state: UiState) => {
        return {
            ...state, 
            loadedApps: [AppInit.ACCOUNT]
        }
    }),
    on(startRequest, (state) => ({
        ...state,
        actionOngoing: true,
        blockByRequest: true,
        requestCounter: state.requestCounter + 1
    })),
    on(endRequest, (state) => ({
        ...state,
        actionOngoing: false,
        blockByRequest: (state.requestCounter === 1) ? false : state.blockByRequest,
        requestCounter: state.requestCounter - 1
    }))
)