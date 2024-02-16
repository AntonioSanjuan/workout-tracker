import { userReducer } from "./user.reducer"
import { userInitialState } from "./models/userState.initialState";
import { fetchAnonymousUserDataRequest, fetchAuthenticatedUserDataRequest } from "./user.actions";
import firebase from 'firebase/compat/app/';


describe('userReducer', () => {
    describe('setUserData action', () => {
        it('should handle setUserData action', () => {
            const userSut = { email: 'test@test.com'} as firebase.User
            const action = fetchAuthenticatedUserDataRequest({ user: userSut, isNewUser: true})
            const state = userReducer(userInitialState, action)

            expect(state.user).toEqual(userSut)
            expect(state.isLogged).toBeTruthy()
        })
    })

    describe('fetchAnonymousUserDataRequest action', () => {
        it('should handle fetchAnonymousUserDataRequest action', () => {
            const action = fetchAnonymousUserDataRequest()
            const state = userReducer(userInitialState, action)

            expect(state.user).toBeUndefined()
            expect(state.isLogged).toBeFalsy()
        })
    })
})