import { of } from 'rxjs'
import { AuthService } from './auth.service'

export const authServiceMock: Partial<AuthService> = {
  logIn: () => of({} as firebase.default.auth.UserCredential),
  logOut: () => of(),
}
