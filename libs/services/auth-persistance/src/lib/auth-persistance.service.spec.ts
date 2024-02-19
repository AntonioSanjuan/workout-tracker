import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { getAuthenticatedUserDataRequest, getAnonymousUserDataRequest, userInitialState } from '@workout-tracker/shared-store';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth'
import { AngularFireModule } from '@angular/fire/compat';
import { BehaviorSubject } from 'rxjs';
import firebase from 'firebase/compat/app';
import { AppRoutes } from '@workout-tracker/models';
import { AuthPersistanceService } from './auth-persistance.service';
describe('AuthPersistanceService', () => {
  let service: AuthPersistanceService;
  let store: Store;
  let router: Router;
  let fireAuth: AngularFireAuth;

  const credentialObservable = new BehaviorSubject<firebase.auth.UserCredential | null>(null);
  const authStateObservable = new BehaviorSubject<firebase.User | null>(null);
  const mock = {
    credential: credentialObservable,
    authState: authStateObservable
  };

  beforeEach(() => {
    credentialObservable.next(null);

    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFireAuth, useValue: mock },
        AuthPersistanceService,
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
    service = TestBed.inject(AuthPersistanceService);
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
    describe('credentialListener', () => {
      it('with new user', () => {
        const credentialMock = { additionalUserInfo: { isNewUser: true},  user: { phoneNumber: '666-66-66-66'} as firebase.User} as firebase.auth.UserCredential
        const userMock = { phoneNumber: '666-66-66-66'} as firebase.User
        credentialObservable.next(credentialMock)
        authStateObservable.next(userMock)

        const dispatchSpy = jest.spyOn(store, 'dispatch')
        fireAuth.credential.subscribe(() => {
          expect(dispatchSpy).toHaveBeenCalledWith(getAuthenticatedUserDataRequest({ user: credentialMock.user as firebase.User, isNewUser: true }))

        })
      })

      it('with non new user', () => {
        const credentialMock = { additionalUserInfo: { isNewUser: false},  user: { phoneNumber: '666-66-66-66'} as firebase.User} as firebase.auth.UserCredential
        const userMock = { phoneNumber: '666-66-66-66'} as firebase.User
        credentialObservable.next(credentialMock)
        authStateObservable.next(userMock)

        const dispatchSpy = jest.spyOn(store, 'dispatch')
        fireAuth.credential.subscribe(() => {
          expect(dispatchSpy).toHaveBeenCalledWith(getAuthenticatedUserDataRequest({ user: credentialMock.user as firebase.User, isNewUser: false }))

        })
      })

      it('with use should redirect to Home', () => {
        const credentialMock = { additionalUserInfo: { isNewUser: true},  user: { phoneNumber: '666-66-66-66'} as firebase.User} as firebase.auth.UserCredential
        const userMock = { phoneNumber: '666-66-66-66'} as firebase.User
        credentialObservable.next(credentialMock)
        authStateObservable.next(userMock)

        const navigateSpy = jest.spyOn(router, 'navigate')
        fireAuth.credential.subscribe(() => {
          expect(navigateSpy).toHaveBeenCalledWith([AppRoutes.Home])

        })
      })


      it('without user', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch')
        fireAuth.credential.subscribe(() => {
          expect(dispatchSpy).toHaveBeenCalledWith(getAnonymousUserDataRequest())
        })
      })
    })
  })
});
