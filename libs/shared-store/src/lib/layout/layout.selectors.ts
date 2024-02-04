import { createFeatureSelector, createSelector } from '@ngrx/store'
import { LayoutState } from './models/layoutState.model'
import { LAYOUT_FEATURE_KEY } from './layout.reducer'


export const getLayoutState = createFeatureSelector<LayoutState>(LAYOUT_FEATURE_KEY)
export const getMenu = createSelector(getLayoutState, (state: LayoutState) => state.menu)
export const getMenuNavBarIsOpened = createSelector(getLayoutState, (state: LayoutState) => state.menu.navBar.isOpened)