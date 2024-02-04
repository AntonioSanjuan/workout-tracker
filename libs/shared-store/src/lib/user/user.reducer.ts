import { createReducer, on } from "@ngrx/store"
import { userInitialState } from "./models/userState.initialState";
import { UserState } from "./models/userState.model";
import { logOutRequest, setUser } from "./user.actions";

export const USER_FEATURE_KEY = 'user';

export const userReducer = createReducer(
    userInitialState,
    on(setUser, (state: UserState, { user }) => {
        return {
            ...state, 
            user,
            isLogged: true
        }
    }),
    on(logOutRequest, (state: UserState) => ({
        ...state,
        user: undefined,
        isLogged: false
    })),
)