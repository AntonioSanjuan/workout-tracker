import { createReducer, on } from "@ngrx/store"
import { routerInitialState } from "./models/routerState.initialState";
import { setCurrentRoute } from "./router.actions";
import { RouterState } from "./models/routerState.model";

export const ROUTER_FEATURE_KEY = 'router';

export const routerReducer = createReducer(
    routerInitialState,
    on(setCurrentRoute, (state: RouterState, { currentRoute }) => {
        return {
            ...state, 
            currentRoute: currentRoute,
            prevRoute: state.currentRoute
            
        }
    }),
)