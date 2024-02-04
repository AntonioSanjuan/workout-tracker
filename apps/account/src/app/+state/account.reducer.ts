import { Action, combineReducers } from '@ngrx/store';

import { AccountState } from './models/accountState.model';
import { initialAccountState } from './models/accountState.initialState';

export const ACCOUNT_FEATURE_KEY = 'account';

export const accountReducer = (state: AccountState = initialAccountState, action: Action) => 
  combineReducers({
  }, initialAccountState)(state, action)
