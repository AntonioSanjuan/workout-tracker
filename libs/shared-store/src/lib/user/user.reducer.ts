import { createReducer, on } from "@ngrx/store"
import { userInitialState } from "./models/userState.initialState";
import { UserState } from "./models/userState.model";
import { fetchAuthenticatedUserDataRequest, fetchAnonymousUserDataRequest, setUserSettingsSuccess } from "./user.actions";

export const USER_FEATURE_KEY = 'user';

export const userReducer = createReducer(
    userInitialState,
    on(fetchAuthenticatedUserDataRequest, (state: UserState, { user }) => {
        return {
            ...state, 
            user: user,
            isLogged: true
        }
    }),
    on(fetchAnonymousUserDataRequest, (state: UserState) => ({
        ...state,
        user: undefined,
        isLogged: false,
        settings: undefined
    })),
    on(setUserSettingsSuccess, (state: UserState, { userSettings }) => ({
        ...state,
        settings: userSettings
    })),
)