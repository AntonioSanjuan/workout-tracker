import { userReducer } from "./user.reducer"
import { userInitialState } from "./models/userState.initialState";
import { setUserData, unsetUserData } from "./user.actions";
describe('userReducer', () => {
    describe('setUserData action', () => {
        it('should handle setUserData action', () => {
            const userSut = { email: 'test@test.com'} as any
            const action = setUserData({ user: userSut})
            const state = userReducer(userInitialState, action)

            expect(state.user).toEqual(userSut)
            expect(state.isLogged).toBeTruthy()
        })
    })

    describe('unsetUserData action', () => {
        it('should handle unsetUserData action', () => {
            const action = unsetUserData()
            const state = userReducer(userInitialState, action)

            expect(state.user).toBeUndefined()
            expect(state.isLogged).toBeFalsy()
        })
    })
})