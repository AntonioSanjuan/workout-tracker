import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { Observable, firstValueFrom, isEmpty, of, throwError } from 'rxjs';
import { UserEffects } from './user.effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import { AuthService, authServiceMock } from '@workout-tracker/services/auth';
import { getAnonymousUserDataRequest, getAuthenticatedUserDataRequest, logOutRequest, loginRequest, loginRequestError, loginRequestSuccess, signUpRequest, signUpRequestError, signUpRequestSuccess, updateUserDataRequest, getAuthenticatedUserDataRequestSuccess, getAnonymousUserDataRequestSuccess, updateUserDataRequestSuccess, setAuthenticatedUser, setAnonymousUser } from './user.actions';
import { AppInit, getIsUILoadedApp, loadedApp, unloadedApp } from '../ui';
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
  describe('setAuthenticatedUser$', () => {
    describe('when setAuthenticatedUser is dispatched', () => {
      const user = { email: 'testemail@gmail.com'} as firebase.User
      const isNewUser = false
      beforeEach(() => { 
        actions = of(setAuthenticatedUser({ user: user, isNewUser: isNewUser}))
      })

      it('should return getAuthenticatedUserDataRequest', async () => {
        const result = await firstValueFrom(effects.setAuthenticatedUser$)
        expect(result).toEqual(getAuthenticatedUserDataRequest({ user: user, isNewUser: isNewUser}))
      })
    })
  });
  describe('setAnonymousUser$', () => {
    describe('when setAnonymousUser is dispatched', () => {
      beforeEach(() => { 
        actions = of(setAnonymousUser())
      })

      it('should return getAnonymousUserDataRequest', async () => {
        const result = await firstValueFrom(effects.setAnonymousUser$)
        expect(result).toEqual(getAnonymousUserDataRequest())
      })
    })
  });
  describe('authenticatedUserDataRequest$', () => {
    const user =  { uid: 'testUID'} as firebase.User

    const userSettingsSut = {
      language: 'langTest',
      darkMode: true
    } as UserSettings

 
    describe('when getAuthenticatedUserDataRequest is dispatched', () => {
      describe('if its new user', () => {
        beforeEach(() => { 
          jest.spyOn(userSettingsService, 'setUserSettings').mockReturnValue(of(userSettingsSut))
          actions = of(getAuthenticatedUserDataRequest({
            user: user,
            isNewUser:true
          }))
        })

        it('should request setUserSettings', async () => {
          const setUserSettingsSpy = jest.spyOn(userSettingsService, 'setUserSettings')
          await firstValueFrom(effects.getAuthenticatedUserDataRequest$)
          expect(setUserSettingsSpy).toHaveBeenCalledWith(user.uid)
        })

        it('should return getAuthenticatedUserDataRequestSuccess', async () => {
          const result = await firstValueFrom(effects.getAuthenticatedUserDataRequest$)
          expect(result).toEqual(getAuthenticatedUserDataRequestSuccess({ userSettings: userSettingsSut}))
        })
      })

      describe('if its not new user', () => {
        beforeEach(() => { 
          jest.spyOn(userSettingsService, 'getUserSettings').mockReturnValue(of(userSettingsSut))
          actions = of(getAuthenticatedUserDataRequest({
            user: user,
            isNewUser:false
          }))
        })
        it('should request setUserSettings', async () => {
          const getUserSettingsSpy = jest.spyOn(userSettingsService, 'getUserSettings')
          await firstValueFrom(effects.getAuthenticatedUserDataRequest$)
          expect(getUserSettingsSpy).toHaveBeenCalledWith(user.uid)
        })

        it('should return getAuthenticatedUserDataRequestSuccess', async () => {
          const result = await firstValueFrom(effects.getAuthenticatedUserDataRequest$)
          expect(result).toEqual(getAuthenticatedUserDataRequestSuccess({ userSettings: userSettingsSut}))
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
      actions = of(getAnonymousUserDataRequest())
    })
    it('should request getAnonymousSettings', async () => {
      const getUserSettingsSpy = jest.spyOn(userSettingsService, 'getAnonymousSettings')
      await firstValueFrom(effects.getAnonymousUserDataRequest$)
      expect(getUserSettingsSpy).toHaveBeenCalled()
    })
    it('should return userDataSuccess', async () => {
      const result = await firstValueFrom(effects.getAnonymousUserDataRequest$)
      expect(result).toEqual(getAnonymousUserDataRequestSuccess({ userSettings: userSettingsSut}))
    })
  })

  describe('when getAuthenticatedUserDataRequestSuccess is dispatched', () => {
    const userSettingsSut = {
      language: 'langTest',
      darkMode: true
    } as UserSettings

    describe('if UI app its already loaded', () => {
      beforeEach(() => { 
        actions = of(getAuthenticatedUserDataRequestSuccess({ userSettings: userSettingsSut}))
        store.overrideSelector(getIsUILoadedApp, true)
      })
      it('should return EMPTY', (done) => {
        effects.userDataLoaded$.
        pipe(isEmpty()).subscribe( (res) => {
          expect(res).toEqual(true)
          done()
         });
      })
    })

    describe('if UI app its not already loaded', () => {
      beforeEach(() => { 
        actions = of(getAuthenticatedUserDataRequestSuccess({ userSettings: userSettingsSut}))
        store.overrideSelector(getIsUILoadedApp, false)
      })
      it('should return loadedApp AppInit.UI', async () => {
        const result = await firstValueFrom(effects.userDataLoaded$)
        expect(result).toEqual(loadedApp({initialized: AppInit.UI}))
      })
    })
  })

  describe('when getAnonymousUserDataRequestSuccess is dispatched', () => {
    const userSettingsSut = {
      language: 'langTest',
      darkMode: true
    } as UserSettings

    describe('if UI app its already loaded', () => {
      beforeEach(() => { 
        actions = of(getAnonymousUserDataRequestSuccess({ userSettings: userSettingsSut}))
        store.overrideSelector(getIsUILoadedApp, true)
      })
      it('should return EMPTY', (done) => {
        effects.userDataLoaded$.
        pipe(isEmpty()).subscribe( (res) => {
          expect(res).toEqual(true)
          done()
         });
      })
    })

    describe('if UI app its not already loaded', () => {
      beforeEach(() => { 
        actions = of(getAnonymousUserDataRequestSuccess({ userSettings: userSettingsSut}))
        store.overrideSelector(getIsUILoadedApp, false)
      })
      it('should return loadedApp AppInit.UI', async () => {
        const result = await firstValueFrom(effects.userDataLoaded$)
        expect(result).toEqual(loadedApp({initialized: AppInit.UI}))
      })
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
        actions = of(updateUserDataRequest({
          userSettings: userSettingsSut
        }))
      })
      it('should request updateUserSettings', async () => {
        const updateUserSettingsSpy = jest.spyOn(userSettingsService, 'updateUserSettings')
        await firstValueFrom(effects.updateUserSettings$)
        expect(updateUserSettingsSpy).toHaveBeenCalledWith(user.uid, userSettingsSut)
      })
      it('should return updateUserDataRequestSuccess', async () => {
        const result = await firstValueFrom(effects.updateUserSettings$)
        expect(result).toEqual(updateUserDataRequestSuccess({ userSettings: userSettingsSut}))
      })
    })

    describe('if its not user stored', () => {
      beforeEach(() => { 
        store.overrideSelector(getUser, undefined);
        jest.spyOn(userSettingsService, 'updateAnonymousSettings').mockReturnValue(of(userSettingsSut))
        actions = of(updateUserDataRequest({
          userSettings: userSettingsSut
        }))
      })
      it('should request updateAnonymousSettings', async () => {
        const updateUserSettingsSpy = jest.spyOn(userSettingsService, 'updateAnonymousSettings')
        await firstValueFrom(effects.updateUserSettings$)
        expect(updateUserSettingsSpy).toHaveBeenCalledWith(userSettingsSut)
      })
      it('should return updateUserDataRequestSuccess', async () => {
        const result = await firstValueFrom(effects.updateUserSettings$)
        expect(result).toEqual(updateUserDataRequestSuccess({ userSettings: userSettingsSut}))
      })
    })
  })
});
