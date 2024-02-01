import { ActionReducerMap } from "@ngrx/store";
import { UI_FEATURE_KEY, UiState, uiInitialState, uiReducer } from "@workout-tracker/shared-store";

export const rootInitialState = {
    [UI_FEATURE_KEY]: uiInitialState,
}

export interface RootState {
    [UI_FEATURE_KEY]: UiState;
}

export const reducers: ActionReducerMap<RootState> = {
    [UI_FEATURE_KEY]: uiReducer,
}