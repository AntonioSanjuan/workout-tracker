import { createReducer, on } from "@ngrx/store"
import { userInitialState } from "./models/userState.initialState";
import { UserState } from "./models/userState.model";
import { getAuthenticatedUserDataRequest, getAnonymousUserDataRequest, setAuthenticatedUser, setAnonymousUser, getAuthenticatedUserDataRequestSuccess, getAnonymousUserDataRequestSuccess, updateUserDataRequestSuccess } from "./user.actions";

export const USER_FEATURE_KEY = 'user'; 

export const userReducer = createReducer(
    userInitialState,
    on(setAuthenticatedUser, (state: UserState, { user, isNewUser }) => {
        return {
            ...state, 
            user: user,
            isLogged: true,
            settings: undefined
        }
    }),
    on(setAnonymousUser, (state: UserState) => ({
        ...state,
        user: undefined,
        isLogged: false,
        settings: undefined
    })),
    on(getAuthenticatedUserDataRequest, (state: UserState, { user }) => {
        return {
            ...state, 
            user: user,
            isLogged: true
        }
    }),
    on(getAnonymousUserDataRequest, (state: UserState) => ({
        ...state,
        user: undefined,
        isLogged: false,
        settings: undefined
    })),
    on(
        getAuthenticatedUserDataRequestSuccess, 
        getAnonymousUserDataRequestSuccess, 
        updateUserDataRequestSuccess,
        (state: UserState, { userSettings }) => ({
            ...state,
            settings: userSettings
    })),
)