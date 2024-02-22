import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { Observable, firstValueFrom, isEmpty, of, throwError } from 'rxjs';
import { UserEffects } from './user.effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import { AuthService, authServiceMock } from '@workout-tracker/services/auth';
import { logOutRequest, loginRequest, loginRequestError, loginRequestSuccess, signUpRequest, signUpRequestError, signUpRequestSuccess, setAuthenticatedUser, setAnonymousUser, setUserInfo } from './user.actions';
import { AppInit, getIsUILoadedApp, loadedApp, unloadedApp } from '../ui';
import firebase from 'firebase/compat/app';
import { showError } from '../error-messages';
import { UserSettingsService, userSettingsServiceMock } from '@workout-tracker/services/user-settings';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { userStateMock } from '@workout-tracker/test';
import { UserSettings } from '@workout-tracker/models';
import { getAnonymousUserSettingsRequest, getAnonymousUserSettingsRequestSuccess, getAuthenticatedUserSettingsRequest, getAuthenticatedUserSettingsRequestSuccess } from '../settings';

describe('UserEffects', () => {
  let actions: Observable<Action>;
  let effects: UserEffects
  let authService: AuthService
  let store: MockStore

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
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
  });

  describe('loginRequest$', () => {

    describe('when loginRequest is dispatched', () => {
      const successResp: firebase.auth.UserCredential = { additionalUserInfo: null } as firebase.auth.UserCredential 
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
        beforeEach(() => { 
          jest.spyOn(authService, 'logIn').mockReturnValue(of(successResp as firebase.auth.UserCredential))
          actions = of(loginRequest({ userEmail: userEmailSut, userPass: userPassSut }))
        })

        it('should call loginRequestSuccess', async () => {
          const result = await firstValueFrom(effects.loginRequest$)
          expect(result).toEqual(loginRequestSuccess({ credentials: successResp }))
        })
      })
    })
  });

  describe('loginRequestSuccess$', () => {
    const successResp: firebase.auth.UserCredential = { additionalUserInfo: null } as firebase.auth.UserCredential 

    describe('when loginRequestSuccess is dispatched', () => {
      beforeEach(() => { 
        actions = of(loginRequestSuccess({ credentials: successResp }))
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
    const successResp: firebase.auth.UserCredential = { additionalUserInfo: null } as firebase.auth.UserCredential 
    const userEmailSut = 'userEmailSut'
    const userPassSut = 'userPassSut'

    describe('when signUpRequest is dispatched', () => {
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
        beforeEach(() => { 
          jest.spyOn(authService, 'signUp').mockReturnValue(of(successResp as firebase.auth.UserCredential))
          actions = of(signUpRequest({ userEmail: userEmailSut, userPass: userPassSut }))
        })

        it('should call signUpRequestSuccess', async () => {
          const result = await firstValueFrom(effects.signUpRequest$)
          expect(result).toEqual(signUpRequestSuccess({ credentials: successResp}))
        })
      })
    })
  });

  describe('signUpRequestSuccess$', () => {
    const successResp: firebase.auth.UserCredential = { additionalUserInfo: null } as firebase.auth.UserCredential 
    
    describe('when signUpRequestSuccess is dispatched', () => {
      beforeEach(() => { 
        actions = of(signUpRequestSuccess({ credentials: successResp}))
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

  describe('checkNewUser$', () => {
    const credentials = { additionalUserInfo: { username: 'userNameTest'}} as firebase.auth.UserCredential
    describe('when signUpRequestSuccess is dispatched', () => {
      beforeEach(() => { 
        actions = of(signUpRequestSuccess({ credentials: credentials}))
      })

      describe('if authService.isNewUser', () => {
        const isNewUser = true
        beforeEach(() => {
          jest.spyOn(authService, 'isNewUser').mockReturnValue(isNewUser)
        })

        it('should return setUserInfo', async () => {
          const result = await firstValueFrom(effects.checkNewUser$)
          expect(result).toEqual(setUserInfo({
            isNewUser: isNewUser,
            userName: credentials.additionalUserInfo?.username as string
          }))
        })
      })

      describe('if no authService.isNewUser', () => {
        const isNewUser = false

        beforeEach(() => {
          jest.spyOn(authService, 'isNewUser').mockReturnValue(isNewUser)
        })

        it('should return setUserInfo', async () => {
          const result = await firstValueFrom(effects.checkNewUser$)
          expect(result).toEqual(setUserInfo({
            isNewUser: isNewUser,
            userName: credentials.additionalUserInfo?.username as string
          }))
        })
      })

    })

    describe('when loginGoogleRequestSuccess is dispatched', () => {
      beforeEach(() => { 
        actions = of(signUpRequestSuccess({ credentials: credentials}))
      })

      describe('if authService.isNewUser', () => {
        const isNewUser = true
        beforeEach(() => {
          jest.spyOn(authService, 'isNewUser').mockReturnValue(isNewUser)
        })

        it('should return setUserInfo', async () => {
          const result = await firstValueFrom(effects.checkNewUser$)
          expect(result).toEqual(setUserInfo({
            isNewUser: isNewUser,
            userName: credentials.additionalUserInfo?.username as string
          }))
        })
      })

      describe('if no authService.isNewUser', () => {
        const isNewUser = false

        beforeEach(() => {
          jest.spyOn(authService, 'isNewUser').mockReturnValue(isNewUser)
        })

        it('should return setUserInfo', async () => {
          const result = await firstValueFrom(effects.checkNewUser$)
          expect(result).toEqual(setUserInfo({
            isNewUser: isNewUser,
            userName: credentials.additionalUserInfo?.username as string
          }))
        })
      })

    })

    describe('when loginRequestSuccess is dispatched', () => {
      beforeEach(() => { 
        actions = of(signUpRequestSuccess({ credentials: credentials}))
      })

      describe('if authService.isNewUser', () => {
        const isNewUser = true
        beforeEach(() => {
          jest.spyOn(authService, 'isNewUser').mockReturnValue(isNewUser)
        })

        it('should return setUserInfo', async () => {
          const result = await firstValueFrom(effects.checkNewUser$)
          expect(result).toEqual(setUserInfo({
            isNewUser: isNewUser,
            userName: credentials.additionalUserInfo?.username as string
          }))
        })
      })

      describe('if no authService.isNewUser', () => {
        const isNewUser = false

        beforeEach(() => {
          jest.spyOn(authService, 'isNewUser').mockReturnValue(isNewUser)
        })

        it('should return setUserInfo', async () => {
          const result = await firstValueFrom(effects.checkNewUser$)
          expect(result).toEqual(setUserInfo({
            isNewUser: isNewUser,
            userName: credentials.additionalUserInfo?.username as string
          }))
        })
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
      beforeEach(() => { 
        actions = of(setAuthenticatedUser({ user: user}))
      })

      it('should return getAuthenticatedUserSettingsRequest', async () => {
        const result = await firstValueFrom(effects.setAuthenticatedUser$)
        expect(result).toEqual(getAuthenticatedUserSettingsRequest())
      })
    })
  });
  describe('setAnonymousUser$', () => {
    describe('when setAnonymousUser is dispatched', () => {
      beforeEach(() => { 
        actions = of(setAnonymousUser())
      })

      it('should return getAnonymousUserSettingsRequest', async () => {
        const result = await firstValueFrom(effects.setAnonymousUser$)
        expect(result).toEqual(getAnonymousUserSettingsRequest())
      })
    })
  });

  describe('UserSettingsLoaded$', () => {
    describe('when getAuthenticatedUserSettingsRequestSuccess is dispatched', () => {
      const userSettingsSut = {
        language: 'langTest',
        darkMode: true
      } as UserSettings
  
      describe('if UI app its already loaded', () => {
        beforeEach(() => { 
          actions = of(getAuthenticatedUserSettingsRequestSuccess({ userSettings: userSettingsSut}))
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
          actions = of(getAuthenticatedUserSettingsRequestSuccess({ userSettings: userSettingsSut}))
          store.overrideSelector(getIsUILoadedApp, false)
        })
        it('should return loadedApp AppInit.UI', async () => {
          const result = await firstValueFrom(effects.userDataLoaded$)
          expect(result).toEqual(loadedApp({initialized: AppInit.UI}))
        })
      })
    })
  
    describe('when getAnonymousUserSettingsRequestSuccess is dispatched', () => {
      const userSettingsSut = {
        language: 'langTest',
        darkMode: true
      } as UserSettings
  
      describe('if UI app its already loaded', () => {
        beforeEach(() => { 
          actions = of(getAnonymousUserSettingsRequestSuccess({ userSettings: userSettingsSut}))
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
          actions = of(getAnonymousUserSettingsRequestSuccess({ userSettings: userSettingsSut}))
          store.overrideSelector(getIsUILoadedApp, false)
        })
        it('should return loadedApp AppInit.UI', async () => {
          const result = await firstValueFrom(effects.userDataLoaded$)
          expect(result).toEqual(loadedApp({initialized: AppInit.UI}))
        })
      })
    })
  })
});
