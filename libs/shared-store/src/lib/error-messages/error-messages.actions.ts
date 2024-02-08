import { createAction, props } from "@ngrx/store";

export const SHOW_ERROR = 'SHOW ERROR'
export const showError = createAction(SHOW_ERROR, props<{errorMessage: string}>())