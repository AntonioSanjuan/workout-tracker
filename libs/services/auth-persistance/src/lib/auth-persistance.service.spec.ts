import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { fetchAuthenticatedUserData, userInitialState } from '@workout-tracker/shared-store';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth'
import { AngularFireModule } from '@angular/fire/compat';
import { BehaviorSubject } from 'rxjs';
import firebase from 'firebase/compat/app';
import { AppRoutes } from '@workout-tracker/models';
import { AuthPersistanceService } from './auth-persistance.service';
import { fetchAnonymousUserData } from '@workout-tracker/shared-store'
describe('AuthPersistanceService', () => {
  let service: AuthPersistanceService;
  let store: Store;
  let router: Router;
  let fireAuth: AngularFireAuth;

  const credentialObservable = new BehaviorSubject<firebase.auth.UserCredential | null>(null);
  const mock = {
    createUserWithEmailAndPassword: jest.fn(),
    credential: credentialObservable
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
        const userMock = { additionalUserInfo: { isNewUser: true},  user: { phoneNumber: '666-66-66-66'} as firebase.User} as firebase.auth.UserCredential
        credentialObservable.next(userMock)

        const dispatchSpy = jest.spyOn(store, 'dispatch')
        fireAuth.credential.subscribe(() => {
          expect(dispatchSpy).toHaveBeenCalledWith(fetchAuthenticatedUserData({ user: userMock.user as firebase.User, isNewUser: true }))

        })
      })

      it('with non new user', () => {
        const userMock = { additionalUserInfo: { isNewUser: false},  user: { phoneNumber: '666-66-66-66'} as firebase.User} as firebase.auth.UserCredential
        credentialObservable.next(userMock)

        const dispatchSpy = jest.spyOn(store, 'dispatch')
        fireAuth.credential.subscribe(() => {
          expect(dispatchSpy).toHaveBeenCalledWith(fetchAuthenticatedUserData({ user: userMock.user as firebase.User, isNewUser: false }))

        })
      })

      it('with use should redirect to Home', () => {
        const userMock = { additionalUserInfo: { isNewUser: true},  user: { phoneNumber: '666-66-66-66'} as firebase.User} as firebase.auth.UserCredential
        credentialObservable.next(userMock)

        const navigateSpy = jest.spyOn(router, 'navigate')
        fireAuth.credential.subscribe(() => {
          expect(navigateSpy).toHaveBeenCalledWith([AppRoutes.Home])

        })
      })


      it('without user', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch')
        fireAuth.credential.subscribe(() => {
          expect(dispatchSpy).toHaveBeenCalledWith(fetchAnonymousUserData())
        })
      })
    })
  })
});
