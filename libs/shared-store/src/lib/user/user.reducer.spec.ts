import { userReducer } from "./user.reducer"
import { userInitialState } from "./models/userState.initialState";
import { getAnonymousUserDataRequestSuccess, getAuthenticatedUserDataRequestSuccess, setAnonymousUser, setAuthenticatedUser, setUserInfo, updateUserDataRequestSuccess } from "./user.actions";
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
            expect(state.settings).toBeUndefined()
        })
    })

    describe('setAnonymousUser action', () => {
        it('should handle setAnonymousUser action', () => {
            const action = setAnonymousUser()
            const state = userReducer(userInitialState, action)

            expect(state.user).toBeUndefined()
            expect(state.isLogged).toBeFalsy()
            expect(state.settings).toBeUndefined()
        })
    })

    describe('getAuthenticatedUserDataRequestSuccess action', () => {
        const userSettings = {language: 'test lang', darkMode: false} as UserSettings
        it('should handle getAuthenticatedUserDataRequestSuccess action', () => {
            const action = getAuthenticatedUserDataRequestSuccess({ userSettings: userSettings})
            const state = userReducer(userInitialState, action)

            expect(state.settings).toEqual(userSettings)
        })
    })

    describe('getAnonymousUserDataRequestSuccess action', () => {
        const userSettings = {language: 'test lang', darkMode: false} as UserSettings
        it('should handle getAnonymousUserDataRequestSuccess action', () => {
            const action = getAnonymousUserDataRequestSuccess({ userSettings: userSettings})
            const state = userReducer(userInitialState, action)

            expect(state.settings).toEqual(userSettings)
        })
    })

    describe('updateUserDataRequestSuccess action', () => {
        const userSettings = {language: 'test lang', darkMode: false} as UserSettings
        it('should handle updateUserDataRequestSuccess action', () => {
            const action = updateUserDataRequestSuccess({ userSettings: userSettings})
            const state = userReducer(userInitialState, action)

            expect(state.settings).toEqual(userSettings)
        })
    })
})