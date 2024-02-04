import { ActionReducerMap } from "@ngrx/store";
import { LAYOUT_FEATURE_KEY, LayoutState, UI_FEATURE_KEY, USER_FEATURE_KEY, UiState, UserState, layoutInitialState, layoutReducer, uiInitialState, uiReducer, userInitialState, userReducer } from "@workout-tracker/shared-store";

export const rootInitialState = {
    [UI_FEATURE_KEY]: uiInitialState,
    [USER_FEATURE_KEY]: userInitialState,
    [LAYOUT_FEATURE_KEY]: layoutInitialState
}

export interface RootState {
    [UI_FEATURE_KEY]: UiState;
    [USER_FEATURE_KEY]: UserState;
    [LAYOUT_FEATURE_KEY]: LayoutState;

}

export const reducers: ActionReducerMap<RootState> = {
    [UI_FEATURE_KEY]: uiReducer,
    [USER_FEATURE_KEY]: userReducer,
    [LAYOUT_FEATURE_KEY]: layoutReducer

}