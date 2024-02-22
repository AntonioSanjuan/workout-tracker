/* eslint-disable @nx/enforce-module-boundaries */
import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { AuthService } from './auth.service';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth'
import { AngularFireModule } from '@angular/fire/compat';
import firebase from 'firebase/compat/app';
import { userStateMock } from '@workout-tracker/test'
describe('AuthService', () => {
  let service: AuthService;
  let fireAuth: AngularFireAuth;

  const mock = {
    signInWithEmailAndPassword: jest.fn().mockReturnValue({ additionalUserInfo: { isNewUser: true }} as firebase.auth.UserCredential),
    signOut: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    signInWithPopup: jest.fn()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFireAuth, useValue: mock },
        AuthService,
        provideMockStore({
          initialState: {
            ...userStateMock
          }
        }),
      ],
      imports: [
        AngularFireModule.initializeApp({}),
        AngularFireAuthModule,
      ]
    });
    service = TestBed.inject(AuthService);
    fireAuth = TestBed.inject(AngularFireAuth)
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
        service.logIn(userNameSut, userPassSut).subscribe(() => {
          expect(signInWithEmailAndPasswordSpy).toHaveBeenCalledWith(userNameSut, userPassSut)
        })
      })
    })

    describe('logOut', () => {
      it('logOut success should request signOut', () => {
        const logOutSpy = jest.spyOn(fireAuth, 'signOut').mockResolvedValue()
        service.logOut().subscribe(() => {
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
        service.signUp(userNameSut, userPassSut).subscribe(() => {
          expect(createUserWithEmailAndPasswordSpy).toHaveBeenCalledWith(userNameSut, userPassSut)
        })
      })
    })

    describe('googleSignIn', () => {
      it('googleSignIn success should request signInWithPopup', () => {
        const UserCredentialSut = { user: { phoneNumber: '666-66-66-66'}} as firebase.auth.UserCredential
        const signInWithPopupSpy = jest.spyOn(fireAuth, 'signInWithPopup').mockResolvedValue(UserCredentialSut)
        service.googleSignIn().subscribe(() => {
          expect(signInWithPopupSpy).toHaveBeenCalledWith(new firebase.auth.GoogleAuthProvider())
        })
      })
    })

    describe('isNewUser', () => {
      it('Should return true if credentials its new user flag is active', () => {
        const credentials = { additionalUserInfo: { isNewUser: true }} as firebase.auth.UserCredential
        expect(service.isNewUser(credentials)).toBeTruthy()
      })

      it('Should return false if credentials its new user flag is not active', () => {
        const credentials = { additionalUserInfo: { isNewUser: false }} as firebase.auth.UserCredential
        expect(service.isNewUser(credentials)).toBeFalsy()
      })

      it('Should return false if not credentials', () => {
        expect(service.isNewUser(null)).toBeFalsy()
      })
    })
  })
});
