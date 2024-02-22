import { ActionReducerMap } from "@ngrx/store";
import { EXERCISES_FEATURE_KEY, ExercisesState, LAYOUT_FEATURE_KEY, LayoutState, SETTINGS_FEATURE_KEY, SettingsState, UI_FEATURE_KEY, USER_FEATURE_KEY, UiState, UserState, exercisesInitialState, exercisesReducer, layoutInitialState, layoutReducer, settingsInitialState, settingsReducer, uiInitialState, uiReducer, userInitialState, userReducer } from "@workout-tracker/shared-store";

export const rootInitialState = {
    [UI_FEATURE_KEY]: uiInitialState,
    [USER_FEATURE_KEY]: userInitialState,
    [SETTINGS_FEATURE_KEY]: settingsInitialState,
    [LAYOUT_FEATURE_KEY]: layoutInitialState,
    [EXERCISES_FEATURE_KEY]: exercisesInitialState
}

export interface RootState {
    [UI_FEATURE_KEY]: UiState;
    [USER_FEATURE_KEY]: UserState;
    [SETTINGS_FEATURE_KEY]: SettingsState;
    [LAYOUT_FEATURE_KEY]: LayoutState;
    [EXERCISES_FEATURE_KEY]: ExercisesState
}

export const reducers: ActionReducerMap<RootState> = {
    [UI_FEATURE_KEY]: uiReducer,
    [USER_FEATURE_KEY]: userReducer,
    [SETTINGS_FEATURE_KEY]: settingsReducer,
    [LAYOUT_FEATURE_KEY]: layoutReducer,
    [EXERCISES_FEATURE_KEY]: exercisesReducer
}