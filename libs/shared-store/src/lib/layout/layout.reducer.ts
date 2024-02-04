import { createReducer, on } from "@ngrx/store"
import { closeNavBar, switchNavBar } from "./layout.actions";
import { layoutInitialState } from "./models/layoutState.initialState";
import { LayoutState } from "./models/layoutState.model";

export const LAYOUT_FEATURE_KEY = 'layout';

export const layoutReducer = createReducer(
    layoutInitialState,
    on(switchNavBar, (state: LayoutState) => {
        return {
            ...state, 
            menu: {
                ...state.menu,
                navBar: {
                    ...state.menu.navBar,
                    isOpened: !state.menu.navBar.isOpened
                }
            },
        }
    }),
    on(closeNavBar, (state: LayoutState) => {
        return {
            ...state, 
            menu: {
                ...state.menu,
                navBar: {
                    ...state.menu.navBar,
                    isOpened: false
                }
            },
        }
    }),
)