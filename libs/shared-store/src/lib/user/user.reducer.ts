import { createReducer, on } from "@ngrx/store"
import { userInitialState } from "./models/userState.initialState";
import { UserState } from "./models/userState.model";
import { setAnonymousUser, getAuthenticatedUserDataRequestSuccess, getAnonymousUserDataRequestSuccess, updateUserDataRequestSuccess, setAuthenticatedUser, setUserInfo } from "./user.actions";

export const USER_FEATURE_KEY = 'user'; 

export const userReducer = createReducer(
    userInitialState,
    on(setUserInfo, (state: UserState, { isNewUser, userName }) => {
        return {
            ...state, 
            isNewUser: isNewUser,
            userName: userName
        }
    }),
    on(setAuthenticatedUser, (state: UserState, { user }) => {
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
    on(
        getAuthenticatedUserDataRequestSuccess, 
        getAnonymousUserDataRequestSuccess, 
        updateUserDataRequestSuccess,
        (state: UserState, { userSettings }) => ({
            ...state,
            settings: userSettings
    })),
)