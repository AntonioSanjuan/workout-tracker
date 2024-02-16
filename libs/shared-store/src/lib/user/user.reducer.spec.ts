import { userReducer } from "./user.reducer"
import { userInitialState } from "./models/userState.initialState";
import { fetchAnonymousUserData, fetchAuthenticatedUserData } from "./user.actions";
import firebase from 'firebase/compat/app/';


describe('userReducer', () => {
    describe('setUserData action', () => {
        it('should handle setUserData action', () => {
            const userSut = { email: 'test@test.com'} as firebase.User
            const action = fetchAuthenticatedUserData({ user: userSut, isNewUser: true})
            const state = userReducer(userInitialState, action)

            expect(state.user).toEqual(userSut)
            expect(state.isLogged).toBeTruthy()
        })
    })

    describe('fetchAnonymousUserData action', () => {
        it('should handle fetchAnonymousUserData action', () => {
            const action = fetchAnonymousUserData()
            const state = userReducer(userInitialState, action)

            expect(state.user).toBeUndefined()
            expect(state.isLogged).toBeFalsy()
        })
    })
})