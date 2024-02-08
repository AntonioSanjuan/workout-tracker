import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { Observable, filter, firstValueFrom, of, throwError } from 'rxjs';
import { UserEffects } from './user.effects';
import { routerNavigationAction } from '@ngrx/router-store';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import { AuthService, authServiceMock } from '@workout-tracker/services/auth';
import { logOutRequest, loginRequest, loginRequestError, loginRequestSuccess } from './user.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { AppInit, loadedApp, unloadedApp } from '../ui';
import firebase from 'firebase/compat/app';

describe('UserEffects', () => {
  let actions: Observable<Action>;
  let effects: UserEffects
  let authService: AuthService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        UserEffects,
        provideMockActions(() => actions),
      ],
    });

    effects = TestBed.inject(UserEffects);
    actions = TestBed.inject(Actions)
    authService = TestBed.inject(AuthService)
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
})
