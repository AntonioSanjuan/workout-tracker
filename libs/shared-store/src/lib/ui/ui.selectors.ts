import { createFeatureSelector, createSelector } from '@ngrx/store'
import { UiState } from './models/uiState.model'
import { UI_FEATURE_KEY } from './ui.reducer'
import { AppInit } from './models/app-init-enum'

export const getUiState = createFeatureSelector<UiState>(UI_FEATURE_KEY)
export const getIsBlockByRequest = createSelector(getUiState, (state: UiState) => state.blockByRequest)
export const getIsUILoadedApp = createSelector(getUiState, (state: UiState) => (state.loadedApps.findIndex((loadedApp: AppInit) => loadedApp === AppInit.UI) > -1))