import { userReducer } from "./user.reducer"
import { userInitialState } from "./models/userState.initialState";
import { setAnonymousUser, setAuthenticatedUser, setUserInfo } from "./user.actions";
import firebase from 'firebase/compat/app/';
import { UserSettings } from "@workout-tracker/models";


describe('userReducer', () => {
    describe('setUserInfo action', () => {
        it('should handle setUserInfo action', () => {
            const isNewUser = false;
            const userName = 'userNameTest'
            const action = setUserInfo({ isNewUser: isNewUser, userName: userName })
            const state = userReducer(userInitialState, action)

            expect(state.userName).toEqual(userName)
            expect(state.isNewUser).toEqual(isNewUser)
        })
    })
    describe('setAuthenticatedUser action', () => {
        it('should handle setAuthenticatedUser action', () => {
            const userSut = { email: 'test@test.com'} as firebase.User
            const action = setAuthenticatedUser({ user: userSut })
            const state = userReducer(userInitialState, action)

            expect(state.user).toEqual(userSut)
            expect(state.isLogged).toBeTruthy()
        })
    })

    describe('setAnonymousUser action', () => {
        it('should handle setAnonymousUser action', () => {
            const action = setAnonymousUser()
            const state = userReducer(userInitialState, action)

            expect(state.user).toBeUndefined()
            expect(state.isLogged).toBeFalsy()
        })
    })
})