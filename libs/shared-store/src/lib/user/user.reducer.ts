import { createReducer, on } from "@ngrx/store"
import { userInitialState } from "./models/userState.initialState";
import { UserState } from "./models/userState.model";
import { authenticatedUserDataRequest, anonymousUserDataRequest, setUserSettingsSuccess } from "./user.actions";

export const USER_FEATURE_KEY = 'user';

export const userReducer = createReducer(
    userInitialState,
    on(authenticatedUserDataRequest, (state: UserState, { user }) => {
        return {
            ...state, 
            user: user,
            isLogged: true
        }
    }),
    on(anonymousUserDataRequest, (state: UserState) => ({
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