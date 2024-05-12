import { TestBed } from "@angular/core/testing";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { BehaviorSubject, Observable } from "rxjs";
import { Action } from '@ngrx/store';
import { provideMockActions } from "@ngrx/effects/testing";
import { CanActivateUser } from "./user.guard";
import { AuthPersistanceService } from "@workout-tracker/services/auth-persistance";
import { appRoutes } from "../../app.routes";
import { uiStateMock } from "@workout-tracker/test";
import { AppInit, getIsAppLoaded } from "@workout-tracker/shared-store";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import firebase from 'firebase/compat/app';

describe('CanActivateUser', () => {
    let actions: Observable<Action>;
    let guard: CanActivateUser;
    let store: MockStore;
    let authPersistanceService: AuthPersistanceService;
    let router: Router;
  
    const mock = {
      authState: new BehaviorSubject<firebase.User | null>(null)
    };

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
            RouterTestingModule.withRoutes(appRoutes),
        ],
        providers:[
            CanActivateUser,
          { provide: AngularFireAuth, useValue: mock },
            AuthPersistanceService,
            provideMockActions(() => actions),
            provideMockStore({
              initialState: {
                ...uiStateMock
              }
            }),
          ]
      });
  
      guard = TestBed.inject(CanActivateUser);
      authPersistanceService = TestBed.inject(AuthPersistanceService)
      store = TestBed.inject(MockStore)
      router = TestBed.inject(Router)
    });
    describe('Unit tests', () => {
        it('should be created', () => {
        expect(guard).toBeTruthy();
      });
    })
  
    describe('Integration tests', () => {

      describe('canActivate', () => {
        describe('if ACCOUNT app is loaded', () => {
          beforeEach(() => {
            store.overrideSelector(getIsAppLoaded(AppInit.ACCOUNT), true)
            store.refreshState()
          })

          it('authPersistanceService initialize should not be requested', () => {
            const initializeSpy = jest.spyOn(authPersistanceService, 'initialize')
            guard.canActivate().subscribe((_) => {
              expect(initializeSpy).not.toHaveBeenCalled()
            })
          })
        })
        describe('if ACCOUNT app is not loaded', () => {
          beforeEach(() => {
            store.overrideSelector(getIsAppLoaded(AppInit.ACCOUNT), false)
            store.refreshState()
          })

          it('authPersistanceService initialize should be requested', () => {
            const initializeSpy = jest.spyOn(authPersistanceService, 'initialize')
            guard.canActivate().subscribe((_) => {
              expect(initializeSpy).toHaveBeenCalled()
            })
          })


        })

      })
    })
  });