import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { setUserData, unsetUserData, userInitialState } from '@workout-tracker/shared-store';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth'
import { AngularFireModule } from '@angular/fire/compat';
import { BehaviorSubject, of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let store: Store;
  let router: Router;
  let fireAuth: AngularFireAuth;

  const authStateObservable = new BehaviorSubject<firebase.default.User | null>(null);
  const mock = {
    signInWithEmailAndPassword: jest.fn().mockReturnValue({ additionalUserInfo: { isNewUser: true }} as firebase.default.auth.UserCredential),
    signOut: jest.fn(),
    authState: authStateObservable
  };

  beforeEach(() => {
    authStateObservable.next(null);

    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFireAuth, useValue: mock },
        AuthService,
        provideMockStore({
          initialState: userInitialState
        }),
      ],
      imports: [
        AngularFireModule.initializeApp({}),
        AngularFireAuthModule,
        RouterTestingModule.withRoutes([])
      ]
    });
    service = TestBed.inject(AuthService);
    store = TestBed.inject(Store);
    fireAuth = TestBed.inject(AngularFireAuth)
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

      it('Login success should request signInWithEmailAndPassword', () => {
        const UserCredentialSut = { user: { phoneNumber: '666-66-66-66'}} as firebase.default.auth.UserCredential
        const signInWithEmailAndPasswordSpy = jest.spyOn(fireAuth, 'signInWithEmailAndPassword').mockResolvedValue(UserCredentialSut)
        service.logIn(userNameSut, userPassSut).subscribe((resp: any) => {
          expect(signInWithEmailAndPasswordSpy).toHaveBeenCalledWith(userNameSut, userPassSut)
        })
      })
    })

    describe('logOut', () => {
      it('logOut success should request signOut', () => {
        const logOutSpy = jest.spyOn(fireAuth, 'signOut').mockResolvedValue()
        service.logOut().subscribe((resp: any) => {
          expect(logOutSpy).toHaveBeenCalledWith()
        })
      })
    })

    describe('authStateListener', () => {
      it('with user', () => {
        const userMock = { phoneNumber: '666-66-66-66'} as firebase.default.User 
        authStateObservable.next(userMock)

        const dispatchSpy = jest.spyOn(store, 'dispatch')
        fireAuth.authState.subscribe((data) => {
          expect(dispatchSpy).toHaveBeenCalledWith(setUserData({ user: userMock }))

        })
      })

      it('without user', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch')
        fireAuth.authState.subscribe((data) => {
          expect(dispatchSpy).toHaveBeenCalledWith(unsetUserData())
        })
      })
    })
  })
});
