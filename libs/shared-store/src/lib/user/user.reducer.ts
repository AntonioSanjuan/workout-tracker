import { createReducer, on } from "@ngrx/store"
import { userInitialState } from "./models/userState.initialState";
import { UserState } from "./models/userState.model";
import { setAnonymousUser, setAuthenticatedUser, setUserInfo } from "./user.actions";

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
            isNewUser: true,
            userName: undefined
        }
    }),
    on(setAnonymousUser, (state: UserState) => {
        return {
            ...state,
            user: undefined,
            isLogged: false,
            settings: undefined,
            userName: undefined
        }
    }),
)