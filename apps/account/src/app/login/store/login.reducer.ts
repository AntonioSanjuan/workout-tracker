import { createReducer, on } from '@ngrx/store';
import * as LoginActions from "./login.actions";

export interface LoginState {
    numberOfFailures: number
}

export const initialLoginState: LoginState = {
    numberOfFailures: 0,
}

export const loginReducer = createReducer(
    initialLoginState,
  on(LoginActions.loginRequestError, (state: LoginState) => ({
    ...state,
    numberOfFailures: state.numberOfFailures + 1
  })),
  on(LoginActions.loginRequestSuccess, (state: LoginState) => ({
    ...state,
    numberOfFailures: 0,
  })),
);