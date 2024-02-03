import { loginReducer, LoginState, initialLoginState } from './login.reducer';
import * as LoginActions from './login.actions';

describe('Login Reducer', () => {
  it('should increment the number of tries on loginRequestError', () => {
    const initialState: LoginState = initialLoginState;
    const action = LoginActions.loginRequestError();
    const state = loginReducer(initialState, action);
    
    expect(state.numberOfFailures).toBe(1);
  });

  it('should reset the number of tries to 0 on loginRequestSuccess', () => {
    const initialState: LoginState = { 
      ...initialLoginState,
      numberOfFailures: 3 
    };
    const action = LoginActions.loginRequestSuccess();
    const state = loginReducer(initialState, action);
    
    expect(state.numberOfFailures).toBe(0);
  });

  it('should return the initial state on an unknown action', () => {
    const initialState: LoginState = { 
      ...initialLoginState,
      numberOfFailures: 5 
    };
    const action = { type: 'UnknownAction' };
    const state = loginReducer(initialState, action);
    
    expect(state).toBe(initialState);
  });
});
