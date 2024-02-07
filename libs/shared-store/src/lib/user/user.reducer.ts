import { createReducer, on } from "@ngrx/store"
import { userInitialState } from "./models/userState.initialState";
import { UserState } from "./models/userState.model";
import { setUserData, unsetUserData } from "./user.actions";

export const USER_FEATURE_KEY = 'user';

export const userReducer = createReducer(
    userInitialState,
    on(setUserData, (state: UserState, { user }) => {
        return {
            ...state, 
            user: user,
            isLogged: true
        }
    }),
    on(unsetUserData, (state: UserState) => ({
        ...state,
        user: undefined,
        isLogged: false
    })),
)