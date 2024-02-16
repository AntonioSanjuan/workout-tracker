import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { Observable, firstValueFrom, of, throwError } from 'rxjs';
import { UserEffects } from './user.effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import { AuthService, authServiceMock } from '@workout-tracker/services/auth';
import { anonymousUserDataRequest, authenticatedUserDataRequest, logOutRequest, loginRequest, loginRequestError, loginRequestSuccess, setUserSettingsSuccess, signUpRequest, signUpRequestError, signUpRequestSuccess, updateUserSettings } from './user.actions';
import { AppInit, loadedApp, unloadedApp } from '../ui';
import firebase from 'firebase/compat/app';
import { showError } from '../error-messages';
import { UserSettingsService, userSettingsServiceMock } from '@workout-tracker/services/user-settings';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { userStateMock } from '@workout-tracker/test';
import { UserSettings } from '@workout-tracker/models';
import { getUser } from './user.selectors';

describe('UserEffects', () => {
  let actions: Observable<Action>;
  let effects: UserEffects
  let authService: AuthService
  let userSettingsService: UserSettingsService
  let store: MockStore

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: UserSettingsService, useValue: userSettingsServiceMock },
        UserEffects,
        provideMockStore({
          initialState: userStateMock
        }),
        provideMockActions(() => actions),
      ],
    });

    effects = TestBed.inject(UserEffects);
    actions = TestBed.inject(Actions)
    authService = TestBed.inject(AuthService)
    store = TestBed.inject(MockStore)
    userSettingsService = TestBed.inject(UserSettingsService)
  });

  describe('loginRequest$', () => {
    describe('when loginRequest is dispatched', () => {
      const userEmailSut = 'userEmailSut'
      const userPassSut = 'userPassSut'
      describe('when authService.logIn throws error', () => {
        const errorCodeMock = 'testing error code'
        const errorMock = { message: 'testing error message', code: errorCodeMock } as firebase.FirebaseError
        const errorResp = throwError(() => errorMock )
        beforeEach(() => { 
          jest.spyOn(authService, 'logIn').mockReturnValue(errorResp)
          actions = of(loginRequest({ userEmail: userEmailSut, userPass: userPassSut }))
        })

        it('should call loginRequestError', async () => {
          const result = await firstValueFrom(effects.loginRequest$)
          expect(result).toEqual(loginRequestError({error: errorMock}))
        })
      })

      describe('when authService.logIn success', () => {
        const successResp: Partial<firebase.auth.UserCredential> = { additionalUserInfo: null } 
        beforeEach(() => { 
          jest.spyOn(authService, 'logIn').mockReturnValue(of(successResp as firebase.auth.UserCredential))
          actions = of(loginRequest({ userEmail: userEmailSut, userPass: userPassSut }))
        })

        it('should call loginRequestSuccess', async () => {
          const result = await firstValueFrom(effects.loginRequest$)
          expect(result).toEqual(loginRequestSuccess())
        })
      })
    })
  });

  describe('loginRequestSuccess$', () => {
    describe('when loginRequestSuccess is dispatched', () => {
      beforeEach(() => { 
        actions = of(loginRequestSuccess())
      })

      it('should return loadedApp ACCOUNT', async () => {
        const result = await firstValueFrom(effects.loginRequestSuccess$)
        expect(result).toEqual(loadedApp({initialized: AppInit.ACCOUNT}))
      })
    })
  });

  describe('loginRequestError$', () => {
    const errorMock = { message: 'message', code: "error code exmaple"} as firebase.FirebaseError
    describe('when loginRequestError is dispatched', () => {
      beforeEach(() => { 
        actions = of(loginRequestError({ error: errorMock}))
      })

      it('should return showError', async () => {
        const result = await firstValueFrom(effects.loginRequestError$)
        expect(result).toEqual(showError({errorMessage: errorMock.code}))
      })
    })
  });

  describe('signUpRequest$', () => {
    describe('when signUpRequest is dispatched', () => {
      const userEmailSut = 'userEmailSut'
      const userPassSut = 'userPassSut'
      describe('when authService.signUp throws error', () => {
        const errorCodeMock = 'testing error code'
        const errorMock = { message: 'testing error message', code: errorCodeMock } as firebase.FirebaseError
        const errorResp = throwError(() => errorMock )
        beforeEach(() => { 
          jest.spyOn(authService, 'signUp').mockReturnValue(errorResp)
          actions = of(signUpRequest({ userEmail: userEmailSut, userPass: userPassSut }))
        })

        it('should call signUpRequestError', async () => {
          const result = await firstValueFrom(effects.signUpRequest$)
          expect(result).toEqual(signUpRequestError({error: errorMock}))
        })
      })

      describe('when authService.signUp success', () => {
        const successResp: Partial<firebase.auth.UserCredential> = { additionalUserInfo: null } 
        beforeEach(() => { 
          jest.spyOn(authService, 'signUp').mockReturnValue(of(successResp as firebase.auth.UserCredential))
          actions = of(signUpRequest({ userEmail: userEmailSut, userPass: userPassSut }))
        })

        it('should call signUpRequestSuccess', async () => {
          const result = await firstValueFrom(effects.signUpRequest$)
          expect(result).toEqual(signUpRequestSuccess())
        })
      })
    })
  });

  describe('signUpRequestSuccess$', () => {
    describe('when signUpRequestSuccess is dispatched', () => {
      beforeEach(() => { 
        actions = of(signUpRequestSuccess())
      })

      it('should return loadedApp ACCOUNT', async () => {
        const result = await firstValueFrom(effects.signUpRequestSuccess$)
        expect(result).toEqual(loadedApp({initialized: AppInit.ACCOUNT}))
      })
    })
  });

  describe('signUpRequestError$', () => {
    const errorMock = { message: 'message', code: "error code exmaple"} as firebase.FirebaseError
    describe('when signUpRequestError is dispatched', () => {
      beforeEach(() => { 
        actions = of(signUpRequestError({ error: errorMock}))
      })

      it('should return showError', async () => {
        const result = await firstValueFrom(effects.signUpRequestError$)
        expect(result).toEqual(showError({errorMessage: errorMock.code}))
      })
    })
  });

  describe('logOut$', () => {
    describe('when logOutRequest is dispatched', () => {
      beforeEach(() => { 
        jest.spyOn(authService, 'logOut').mockReturnValue(of(undefined))
        actions = of(logOutRequest())
      })

      it('should return unloadedApp ACCOUNT', async () => {
        const result = await firstValueFrom(effects.logOut$)
        expect(result).toEqual(unloadedApp({uninitialized: AppInit.ACCOUNT}))
      })
    })
  });

  describe('authenticatedUserDataRequest$', () => {
    const user =  { uid: 'testUID'} as firebase.User

    const userSettingsSut = {
      language: 'langTest',
      darkMode: true
    } as UserSettings
    describe('when authenticatedUserDataRequest is dispatched', () => {
      describe('if its new user', () => {
        beforeEach(() => { 
          jest.spyOn(userSettingsService, 'setUserSettingsSuccess').mockReturnValue(of(userSettingsSut))
          actions = of(authenticatedUserDataRequest({
            user: user,
            isNewUser:true
          }))
        })
        it('should return setUserSettingsSuccess', async () => {
          const setUserSettingsSpy = jest.spyOn(userSettingsService, 'setUserSettingsSuccess')
          const result = await firstValueFrom(effects.authenticatedUserDataRequest$)
          expect(setUserSettingsSpy).toHaveBeenCalledWith(user.uid)
          expect(result).toEqual(setUserSettingsSuccess({ userSettings: userSettingsSut}))
        })
      })

      describe('if its not new user', () => {
        beforeEach(() => { 
          jest.spyOn(userSettingsService, 'getUserSettings').mockReturnValue(of(userSettingsSut))
          actions = of(authenticatedUserDataRequest({
            user: user,
            isNewUser:false
          }))
        })
        it('should return setUserSettingsSuccess', async () => {
          const getUserSettingsSpy = jest.spyOn(userSettingsService, 'getUserSettings')
          const result = await firstValueFrom(effects.authenticatedUserDataRequest$)
          expect(getUserSettingsSpy).toHaveBeenCalledWith(user.uid)
          expect(result).toEqual(setUserSettingsSuccess({ userSettings: userSettingsSut}))
        })
      })
    })
  })
  describe('when anonymousUserDataRequest is dispatched', () => {
    const userSettingsSut = {
      language: 'langTest',
      darkMode: true
    } as UserSettings

    beforeEach(() => { 
      jest.spyOn(userSettingsService, 'getAnonymousSettings').mockReturnValue(of(userSettingsSut))
      actions = of(anonymousUserDataRequest())
    })
    it('should return setUserSettingsSuccess', async () => {
      const getAnonymousSettingsSpy = jest.spyOn(userSettingsService, 'getAnonymousSettings')
      const result = await firstValueFrom(effects.anonymousUserDataRequest$)
      expect(getAnonymousSettingsSpy).toHaveBeenCalledWith()
      expect(result).toEqual(setUserSettingsSuccess({ userSettings: userSettingsSut}))
    })
  })

  describe('when setUserSettingsSuccess is dispatched', () => {
    const userSettingsSut = {
      language: 'langTest',
      darkMode: true
    } as UserSettings

    beforeEach(() => { 
      actions = of(setUserSettingsSuccess({ userSettings: userSettingsSut}))
    })
    it('should return loadedApp AppInit.UI', async () => {
      const result = await firstValueFrom(effects.setUserSettingsSuccess$)
      expect(result).toEqual(loadedApp({initialized: AppInit.UI}))
    })
  })

  describe('when updateUserSettings is dispatched', () => {
    const userSettingsSut = {
      language: 'langTest',
      darkMode: true
    } as UserSettings

    const user =  { uid: 'testUID'} as firebase.User

    describe('if user stored', () => {
      beforeEach(() => { 
        store.overrideSelector(getUser, user);
        jest.spyOn(userSettingsService, 'updateUserSettings').mockReturnValue(of(userSettingsSut))
        actions = of(updateUserSettings({
          userSettings: userSettingsSut
        }))
      })
      it('should return setUserSettingsSuccess', async () => {
        const updateUserSettingsSpy = jest.spyOn(userSettingsService, 'updateUserSettings')
        const result = await firstValueFrom(effects.updateUserSettings$)
        expect(updateUserSettingsSpy).toHaveBeenCalledWith(user.uid, userSettingsSut)
        expect(result).toEqual(setUserSettingsSuccess({ userSettings: userSettingsSut}))
      })
    })

    describe('if its not user stored', () => {
      beforeEach(() => { 
        store.overrideSelector(getUser, undefined);
        jest.spyOn(userSettingsService, 'updateAnonymousSettings').mockReturnValue(of(userSettingsSut))
        actions = of(updateUserSettings({
          userSettings: userSettingsSut
        }))
      })
      it('should return setUserSettingsSuccess', async () => {
        const updateUserSettingsSpy = jest.spyOn(userSettingsService, 'updateAnonymousSettings')
        const result = await firstValueFrom(effects.updateUserSettings$)
        expect(updateUserSettingsSpy).toHaveBeenCalledWith(userSettingsSut)
        expect(result).toEqual(setUserSettingsSuccess({ userSettings: userSettingsSut}))
      })
    })
  })
});
