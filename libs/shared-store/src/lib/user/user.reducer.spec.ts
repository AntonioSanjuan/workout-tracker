import { userReducer } from "./user.reducer"
import { userInitialState } from "./models/userState.initialState";
import { setAnonymousUserData, setAuthenticatedUserData } from "./user.actions";
import firebase from 'firebase/compat/app/';


describe('userReducer', () => {
    describe('setUserData action', () => {
        it('should handle setUserData action', () => {
            const userSut = { email: 'test@test.com'} as firebase.User
            const action = setAuthenticatedUserData({ user: userSut, isNewUser: true})
            const state = userReducer(userInitialState, action)

            expect(state.user).toEqual(userSut)
            expect(state.isLogged).toBeTruthy()
        })
    })

    describe('setAnonymousUserData action', () => {
        it('should handle setAnonymousUserData action', () => {
            const action = setAnonymousUserData()
            const state = userReducer(userInitialState, action)

            expect(state.user).toBeUndefined()
            expect(state.isLogged).toBeFalsy()
        })
    })
})