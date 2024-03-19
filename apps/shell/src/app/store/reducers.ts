import { ActionReducerMap } from "@ngrx/store";
import { EXERCISES_FEATURE_KEY, ExercisesState, LAYOUT_FEATURE_KEY, LayoutState, ROUTER_FEATURE_KEY, RouterState, SETTINGS_FEATURE_KEY, SettingsState, TRAININGS_FEATURE_KEY, TrainingsState, UI_FEATURE_KEY, USER_FEATURE_KEY, UiState, UserState, exercisesInitialState, exercisesReducer, layoutInitialState, layoutReducer, routerInitialState, routerReducer, settingsInitialState, settingsReducer, trainingsInitialState, trainingsReducer, uiInitialState, uiReducer, userInitialState, userReducer } from "@workout-tracker/shared-store";

export const rootInitialState = {
    [UI_FEATURE_KEY]: uiInitialState,
    [USER_FEATURE_KEY]: userInitialState,
    [SETTINGS_FEATURE_KEY]: settingsInitialState,
    [LAYOUT_FEATURE_KEY]: layoutInitialState,
    [ROUTER_FEATURE_KEY]: routerInitialState,
    [EXERCISES_FEATURE_KEY]: exercisesInitialState,
    [TRAININGS_FEATURE_KEY]: trainingsInitialState
}

export interface RootState {
    [UI_FEATURE_KEY]: UiState;
    [USER_FEATURE_KEY]: UserState;
    [SETTINGS_FEATURE_KEY]: SettingsState;
    [LAYOUT_FEATURE_KEY]: LayoutState;
    [ROUTER_FEATURE_KEY]: RouterState;
    [EXERCISES_FEATURE_KEY]: ExercisesState;
    [TRAININGS_FEATURE_KEY]: TrainingsState

}

export const reducers: ActionReducerMap<RootState> = {
    [UI_FEATURE_KEY]: uiReducer,
    [USER_FEATURE_KEY]: userReducer,
    [SETTINGS_FEATURE_KEY]: settingsReducer,
    [LAYOUT_FEATURE_KEY]: layoutReducer,
    [ROUTER_FEATURE_KEY]: routerReducer,
    [EXERCISES_FEATURE_KEY]: exercisesReducer,
    [TRAININGS_FEATURE_KEY]: trainingsReducer

}