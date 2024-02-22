import firebase from 'firebase/compat/app/';
import { UserSettings } from '@workout-tracker/models'
import { getAnonymousUserSettingsRequestSuccess, getAuthenticatedUserSettingsRequestSuccess, updateUserSettingsRequestSuccess } from './settings.actions';
import { settingsReducer } from './settings.reducer';
import { settingsInitialState } from './models/settingsState.initialState';


describe('userReducer', () => {

    describe('getAuthenticatedUserSettingsRequestSuccess action', () => {
        const userSettings = {language: 'test lang', darkMode: false} as UserSettings
        it('should handle getAuthenticatedUserSettingsRequestSuccess action', () => {
            const action = getAuthenticatedUserSettingsRequestSuccess({ userSettings: userSettings})
            const state = settingsReducer(settingsInitialState, action)

            expect(state.userSettings).toEqual(userSettings)
        })
    })

    describe('getAnonymousUserSettingsRequestSuccess action', () => {
        const userSettings = {language: 'test lang', darkMode: false} as UserSettings
        it('should handle getAnonymousUserSettingsRequestSuccess action', () => {
            const action = getAnonymousUserSettingsRequestSuccess({ userSettings: userSettings})
            const state = settingsReducer(settingsInitialState, action)

            expect(state.userSettings).toEqual(userSettings)
        })
    })

    describe('updateUserSettingsRequestSuccess action', () => {
        const userSettings = {language: 'test lang', darkMode: false} as UserSettings
        it('should handle updateUserSettingsRequestSuccess action', () => {
            const action = updateUserSettingsRequestSuccess({ userSettings: userSettings})
            const state = settingsReducer(settingsInitialState, action)

            expect(state.userSettings).toEqual(userSettings)
        })
    })
})