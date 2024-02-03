import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, firstValueFrom, of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http'
import { initialAccountState } from '../../+state/models/accountState.initialState';
import { AuthService } from '@workout-tracker/libs/services/auth';
import { LoginEffects } from './login.effects';
import { loginRequest, loginRequestError } from './login.actions';

describe('LoginEffects', () => {
  let actions: Observable<Action>;
  let effects: LoginEffects;
  let authService: AuthService;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        LoginEffects,
        AuthService,
        provideMockActions(() => actions),
        provideMockStore({
          initialState: initialAccountState
        }),
      ],
    });

    effects = TestBed.inject(LoginEffects);
    store = TestBed.inject(Store),
    authService = TestBed.inject(AuthService)
  });

  describe('loginRequest$', () => {
    describe('when loginRequest is dispatched', () => {
      describe('when authService.logIn throws error', () => {
        const errorloginResp = throwError(() => new HttpErrorResponse( { error: '', status: 500} ))
        beforeEach(() => { 
          jest.spyOn(authService, 'logIn').mockReturnValue(errorloginResp)
          actions = of(loginRequest({ loginData: {
            userName: '',
            password: ''
          }}))
        })

        it('should call loginRequestError', async () => {
          const result = await firstValueFrom(effects.loginRequest$)
          expect(result).toEqual(loginRequestError())
        })
      })
    })
  });
});
