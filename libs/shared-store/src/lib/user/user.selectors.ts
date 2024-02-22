import { createFeatureSelector, createSelector } from '@ngrx/store'
import { UserState } from './models/userState.model'
import { USER_FEATURE_KEY } from './user.reducer'


export const getUserState = createFeatureSelector<UserState>(USER_FEATURE_KEY)
export const getUser = createSelector(getUserState, (state: UserState) => state.user)
export const getIsUserLogged = createSelector(getUserState, (state: UserState) => state.isLogged)
export const getIsNewUser = createSelector(getUserState, (state: UserState) => state.isNewUser)
