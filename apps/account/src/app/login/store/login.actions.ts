
import { createAction, props } from '@ngrx/store';
import { LoginData } from '../model/loginRequest.model';

export const loginRequest = createAction(
  '[Account/Login/API] Login Request', props<{ loginData: LoginData}>()
)

export const loginRequestSuccess = createAction(
  '[Account/Login/API] Login Request Success'
)

export const loginRequestError = createAction(
  '[Account/Login/API] Login Request Error'
)
