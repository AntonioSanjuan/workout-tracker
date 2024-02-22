import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { userInitialState, setAuthenticatedUser, setAnonymousUser } from '@workout-tracker/shared-store';
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

  const mock = {
    authState: new BehaviorSubject<firebase.User | null>(null)
  };

  beforeEach(() => {
    mock.authState.next(null);

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

    service.initialize()
  });

  describe('Unit tests', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('Integration tests', () => {
    describe('vitaminizedListener', () => {
      let dispatchSpy!: jest.SpyInstance<void>
      const userMock = { phoneNumber: '666-66-66-66'} as firebase.User
      const nonUserMock = null
      describe('if user', () => {
        beforeEach(() => {

          dispatchSpy = jest.spyOn(store, 'dispatch')
        })
        it('should dispatch setAuthenticatedUser', (done) => {
          mock.authState.next(userMock)

          fireAuth.authState.subscribe((user) => {
            expect(dispatchSpy).toHaveBeenCalledWith(setAuthenticatedUser({ user: userMock as firebase.User}))
            done()
          })
        })
  
        it('should redirect to Home', (done) => {  
          // authStateObservable.next({ phoneNumber: '666-66-66-66'} as firebase.User)
          const navigateSpy = jest.spyOn(router, 'navigate')
          mock.authState.next({ phoneNumber: '666-66-66-66'} as firebase.User)
          fireAuth.authState.subscribe((user) => {
            console.log("user")
            expect(navigateSpy).toHaveBeenCalledWith([AppRoutes.Home])
            done()
          })
        })
      })
      describe('if non user', () => {
        beforeEach(() => {
          mock.authState.next(userMock)

          dispatchSpy = jest.spyOn(store, 'dispatch')
  
        })
        it('should dispatch setAnonymousUser', (done) => {
          const dispatchSpy = jest.spyOn(store, 'dispatch')

          mock.authState.next(nonUserMock)

          fireAuth.authState.subscribe(() => {
            expect(dispatchSpy).toHaveBeenCalledWith(setAnonymousUser())
            done()
          })
        })
      })



    })
  })
});
