import { Action, combineReducers } from '@ngrx/store';

import { loginReducer } from '../login/store/login.reducer';
import { AccountState } from './models/accountState.model';
import { initialAccountState } from './models/accountState.initialState';

export const ACCOUNT_FEATURE_KEY = 'account';

export const accountReducer = (state: AccountState = initialAccountState, action: Action) => 
  combineReducers({
    login: loginReducer
  }, initialAccountState)(state, action)
