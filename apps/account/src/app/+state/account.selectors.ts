import { createFeatureSelector } from '@ngrx/store';
import {
  ACCOUNT_FEATURE_KEY,
} from './account.reducer';
import { AccountState } from './models/accountState.model';

// Lookup the 'Account' feature state managed by NgRx
export const selectAccountState =
  createFeatureSelector<AccountState>(ACCOUNT_FEATURE_KEY);
