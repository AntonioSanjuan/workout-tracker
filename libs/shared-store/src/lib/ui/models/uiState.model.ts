import { AppInit } from "./app-init-enum";

export interface UiState {
    actionOngoing: boolean;
    blockByRequest: boolean;
    requestCounter: number;
    loadedApps: AppInit[];
}