import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { setAnonymousUserData, setAuthenticatedUserData, userInitialState } from '@workout-tracker/shared-store';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth'
import { AngularFireModule } from '@angular/fire/compat';
import { BehaviorSubject, of } from 'rxjs';
import firebase from 'firebase/compat/app';
import { AppRoutes } from '@workout-tracker/models';

describe('AuthService', () => {
  let service: AuthService;
  let store: Store;
  let router: Router;
  let fireAuth: AngularFireAuth;

  const credentialObservable = new BehaviorSubject<firebase.auth.UserCredential | null>(null);
  const mock = {
    signInWithEmailAndPassword: jest.fn().mockReturnValue({ additionalUserInfo: { isNewUser: true }} as firebase.auth.UserCredential),
    signOut: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    credential: credentialObservable
  };

  beforeEach(() => {
    credentialObservable.next(null);

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
        const UserCredentialSut = { user: { phoneNumber: '666-66-66-66'}} as firebase.auth.UserCredential
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

    describe('signUp', () => {
      const userNameSut = 'userNameTest'
      const userPassSut = '****'

      it('signUp success should request createUserWithEmailAndPassword', () => {
        const UserCredentialSut = { user: { phoneNumber: '666-66-66-66'}} as firebase.auth.UserCredential
        const createUserWithEmailAndPasswordSpy = jest.spyOn(fireAuth, 'createUserWithEmailAndPassword').mockResolvedValue(UserCredentialSut)
        service.signUp(userNameSut, userPassSut).subscribe((resp: any) => {
          expect(createUserWithEmailAndPasswordSpy).toHaveBeenCalledWith(userNameSut, userPassSut)
        })
      })
    })

    describe('credentialListener', () => {
      it('with new user', () => {
        const userMock = { additionalUserInfo: { isNewUser: true},  user: { phoneNumber: '666-66-66-66'} as firebase.User} as firebase.auth.UserCredential
        credentialObservable.next(userMock)

        const dispatchSpy = jest.spyOn(store, 'dispatch')
        fireAuth.credential.subscribe((data) => {
          expect(dispatchSpy).toHaveBeenCalledWith(setAuthenticatedUserData({ user: userMock.user as firebase.User, isNewUser: true }))

        })
      })

      it('with non new user', () => {
        const userMock = { additionalUserInfo: { isNewUser: false},  user: { phoneNumber: '666-66-66-66'} as firebase.User} as firebase.auth.UserCredential
        credentialObservable.next(userMock)

        const dispatchSpy = jest.spyOn(store, 'dispatch')
        fireAuth.credential.subscribe((data) => {
          expect(dispatchSpy).toHaveBeenCalledWith(setAuthenticatedUserData({ user: userMock.user as firebase.User, isNewUser: false }))

        })
      })

      it('with use should redirect to Home', () => {
        const userMock = { additionalUserInfo: { isNewUser: true},  user: { phoneNumber: '666-66-66-66'} as firebase.User} as firebase.auth.UserCredential
        credentialObservable.next(userMock)

        const navigateSpy = jest.spyOn(router, 'navigate')
        fireAuth.credential.subscribe((data) => {
          expect(navigateSpy).toHaveBeenCalledWith([AppRoutes.Home])

        })
      })


      it('without user', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch')
        fireAuth.credential.subscribe((data) => {
          expect(dispatchSpy).toHaveBeenCalledWith(setAnonymousUserData())
        })
      })
    })
  })
});
