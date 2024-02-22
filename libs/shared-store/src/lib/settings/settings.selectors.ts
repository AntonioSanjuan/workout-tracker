import { createFeatureSelector, createSelector } from '@ngrx/store'
import { SettingsState } from './models/settingsState.model'
import { SETTINGS_FEATURE_KEY } from './settings.reducer'


export const getSettingsState = createFeatureSelector<SettingsState>(SETTINGS_FEATURE_KEY)
export const getUserSettings = createSelector(getSettingsState, (state: SettingsState) => state.userSettings)