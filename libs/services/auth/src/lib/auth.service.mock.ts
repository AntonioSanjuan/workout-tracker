import { of } from 'rxjs'
import { AuthService } from './auth.service'
import firebase from 'firebase/compat/app/';

export const authServiceMock: Partial<AuthService> = {
  logIn: () => of({} as firebase.auth.UserCredential),
  logOut: () => of(),
  signUp: () => of({} as firebase.auth.UserCredential)
}
