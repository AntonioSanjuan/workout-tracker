import { createReducer, on } from "@ngrx/store"
import { settingsInitialState } from "./models/settingsState.initialState";
import { getAnonymousUserSettingsRequestSuccess, getAuthenticatedUserSettingsRequestSuccess, updateUserSettingsRequestSuccess } from "./settings.actions";
import { SettingsState } from "./models/settingsState.model";

export const SETTINGS_FEATURE_KEY = 'settings'; 

export const settingsReducer = createReducer(
    settingsInitialState,
    on(
        getAuthenticatedUserSettingsRequestSuccess, 
        getAnonymousUserSettingsRequestSuccess, 
        updateUserSettingsRequestSuccess,
        (state: SettingsState, { userSettings }) => ({
            ...state,
            userSettings: userSettings
    })),
)