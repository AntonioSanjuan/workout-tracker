import { createReducer, on } from "@ngrx/store"
import { userInitialState } from "./models/userState.initialState";
import { UserState } from "./models/userState.model";
import { fetchAuthenticatedUserData, fetchAnonymousUserData, setUserData } from "./user.actions";

export const USER_FEATURE_KEY = 'user';

export const userReducer = createReducer(
    userInitialState,
    on(fetchAuthenticatedUserData, (state: UserState, { user }) => {
        return {
            ...state, 
            user: user,
            isLogged: true
        }
    }),
    on(fetchAnonymousUserData, (state: UserState) => ({
        ...state,
        user: undefined,
        isLogged: false,
        settings: undefined
    })),
    on(setUserData, (state: UserState, { userSettings }) => ({
        ...state,
        settings: userSettings
    })),
)