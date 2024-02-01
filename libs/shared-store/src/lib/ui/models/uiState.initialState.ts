import { UiState } from "./uiState.model";

export const uiInitialState: UiState =  {
    actionOngoing: false,
    blockByRequest: false,
    requestCounter: 0,
    loadedApps: []
}