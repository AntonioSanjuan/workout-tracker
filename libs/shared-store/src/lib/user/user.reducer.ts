import { createReducer, on } from "@ngrx/store"
import { userInitialState } from "./models/userState.initialState";
import { UserState } from "./models/userState.model";
import { setAuthenticatedUserData, setAnonymousUserData, setUserSuccess } from "./user.actions";

export const USER_FEATURE_KEY = 'user';

export const userReducer = createReducer(
    userInitialState,
    on(setAuthenticatedUserData, (state: UserState, { user }) => {
        return {
            ...state, 
            user: user,
            isLogged: true
        }
    }),
    on(setAnonymousUserData, (state: UserState) => ({
        ...state,
        user: undefined,
        isLogged: false
    })),
    on(setUserSuccess, (state: UserState, { userSettings }) => ({
        ...state,
        settings: userSettings
    })),
)