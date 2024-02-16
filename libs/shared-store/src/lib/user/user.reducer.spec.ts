import { userReducer } from "./user.reducer"
import { userInitialState } from "./models/userState.initialState";
import { anonymousUserDataRequest, authenticatedUserDataRequest } from "./user.actions";
import firebase from 'firebase/compat/app/';


describe('userReducer', () => {
    describe('setUserData action', () => {
        it('should handle setUserData action', () => {
            const userSut = { email: 'test@test.com'} as firebase.User
            const action = authenticatedUserDataRequest({ user: userSut, isNewUser: true})
            const state = userReducer(userInitialState, action)

            expect(state.user).toEqual(userSut)
            expect(state.isLogged).toBeTruthy()
        })
    })

    describe('anonymousUserDataRequest action', () => {
        it('should handle anonymousUserDataRequest action', () => {
            const action = anonymousUserDataRequest()
            const state = userReducer(userInitialState, action)

            expect(state.user).toBeUndefined()
            expect(state.isLogged).toBeFalsy()
        })
    })
})