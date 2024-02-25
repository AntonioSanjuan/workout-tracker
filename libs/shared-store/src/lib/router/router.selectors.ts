import { createFeatureSelector, createSelector } from '@ngrx/store'
import { ROUTER_FEATURE_KEY } from './router.reducer'
import { RouterState } from './models/routerState.model'


export const getRouterState = createFeatureSelector<RouterState>(ROUTER_FEATURE_KEY)
export const getCurrentRoute = createSelector(getRouterState, (state: RouterState) => state.currentRoute)
export const getPrevRoute = createSelector(getRouterState, (state: RouterState) => state.prevRoute)
