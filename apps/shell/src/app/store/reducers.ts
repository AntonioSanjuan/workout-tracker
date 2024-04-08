import { ActionReducerMap } from "@ngrx/store";
import { LAYOUT_FEATURE_KEY, LayoutState, ROUTER_FEATURE_KEY, RouterState, SETTINGS_FEATURE_KEY, SettingsState, UI_FEATURE_KEY, USER_FEATURE_KEY, UiState, UserState, layoutInitialState, layoutReducer, routerInitialState, routerReducer, settingsInitialState, settingsReducer, uiInitialState, uiReducer, userInitialState, userReducer } from "@workout-tracker/shared-store";

export const rootInitialState = {
    [UI_FEATURE_KEY]: uiInitialState,
    [USER_FEATURE_KEY]: userInitialState,
    [SETTINGS_FEATURE_KEY]: settingsInitialState,
    [LAYOUT_FEATURE_KEY]: layoutInitialState,
    [ROUTER_FEATURE_KEY]: routerInitialState,
}

export interface RootState {
    [UI_FEATURE_KEY]: UiState;
    [USER_FEATURE_KEY]: UserState;
    [SETTINGS_FEATURE_KEY]: SettingsState;
    [LAYOUT_FEATURE_KEY]: LayoutState;
    [ROUTER_FEATURE_KEY]: RouterState;
}

export const reducers: ActionReducerMap<RootState> = {
    [UI_FEATURE_KEY]: uiReducer,
    [USER_FEATURE_KEY]: userReducer,
    [SETTINGS_FEATURE_KEY]: settingsReducer,
    [LAYOUT_FEATURE_KEY]: layoutReducer,
    [ROUTER_FEATURE_KEY]: routerReducer,
}