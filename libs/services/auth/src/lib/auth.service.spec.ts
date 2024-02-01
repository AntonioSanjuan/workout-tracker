import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import { AppInit, clearUser, loadedApp, setUser, unloadedApp, userInitialState } from '@workout-tracker/store';
import { AppRoutes, LoginResponseDto } from '@workout-tracker/libs/models';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthService', () => {
  let service: AuthService;
  let store: Store;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideMockStore({
          initialState: userInitialState
        }),
      ],
      imports: [
        RouterTestingModule.withRoutes([])
      ]
    });
    service = TestBed.inject(AuthService);
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
  });

  describe('Unit tests', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('Integration tests', () => {
    describe('Login', () => {
      const userNameSut = 'userNameTest'
      const userPassSut = '****'

      it('Login success should authenticate user', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch')
        service.logIn(userNameSut, userPassSut).subscribe((resp: LoginResponseDto) => {
          expect(dispatchSpy).toHaveBeenCalledWith(setUser({ user: resp}))
          expect(dispatchSpy).toHaveBeenCalledWith(loadedApp({initialized: AppInit.ACCOUNT}))
        })
      })
      it('Login success should redirect to Home', () => {
        const navigateSpy = jest.spyOn(router, 'navigate')
        service.logIn(userNameSut, userPassSut).subscribe((_) => {
          expect(navigateSpy).toHaveBeenCalledWith([AppRoutes.Home])
        })
      })
    })

    describe('logOut', () => {
      it('logOut success should clear user', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch')
        service.logOut()
        expect(dispatchSpy).toHaveBeenCalledWith(clearUser())
        expect(dispatchSpy).toHaveBeenCalledWith(unloadedApp({uninitialized: AppInit.ACCOUNT}))
      })
      it('Login success should redirect to Home', () => {
        const navigateSpy = jest.spyOn(router, 'navigate')
        service.logOut()
        expect(navigateSpy).toHaveBeenCalledWith([AppRoutes.Login])
      })
    })

    describe('checkAuthPersistance', () => {
      const authStorageKey = 'authenticatedStatus'
      beforeEach(() => { 
        localStorage.removeItem(authStorageKey)
      })
      
      it('if its already logged', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch')
        localStorage.setItem(authStorageKey, 'true')
        service.checkAuthPersistance()
        expect(dispatchSpy).toHaveBeenCalledWith(setUser({ user: expect.anything()}))
        expect(dispatchSpy).toHaveBeenCalledWith(loadedApp({initialized: AppInit.ACCOUNT}))
      })
      it('If its not already logged', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch')
        service.checkAuthPersistance()
        expect(dispatchSpy).not.toHaveBeenCalledWith(setUser(expect.anything()))
        expect(dispatchSpy).not.toHaveBeenCalledWith(loadedApp({initialized: AppInit.ACCOUNT}))
      })
    })
  })
});
