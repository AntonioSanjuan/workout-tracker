import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpComponent } from './sign-up.component';
import { provideMockStore } from '@ngrx/store/testing';
import { accountAppStateMock } from '../+state/test/accountStateMock/accountStateMock.mock';
import { Store } from '@ngrx/store';
import { userStateMock } from '@workout-tracker/test'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { loginGoogleRequest, loginRequest, signUpRequest } from '@workout-tracker/shared-store';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { appRoutes } from '../app.routes';
import { RouterTestingModule } from '@angular/router/testing';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: {
            ...accountAppStateMock, 
          }
        }),
      ],
      imports: [
        BrowserAnimationsModule,
        SignUpComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        }),
        RouterTestingModule.withRoutes(appRoutes),

      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    store = TestBed.inject(Store)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Unit tests', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  })

  describe('Integration tests', () => {
    describe('SignUp', () => {
      it('signUp with valid form should dispatch signUpRequest', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch')

        const userNameSut = 'username test';
        const passwordSut = 'password test';

        component.signUpForm.setValue({
          userEmail: userNameSut,
          password: passwordSut
        })

        component.signUp()

        expect(dispatchSpy).toHaveBeenCalledWith(signUpRequest({
          userEmail: userNameSut,
          userPass: passwordSut
         })
        )
      })
      it('signUp with invalid form should not dispatch signUpRequest', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch')

        const userNameSut = 'username test';

        component.signUpForm.setValue({
          userEmail: userNameSut,
          password: null
        })

        component.signUp()

        expect(dispatchSpy).not.toHaveBeenCalledWith(signUpRequest(expect.anything())
        )
      })
    });

    describe('loginWithGoogle', () => {
      it('loginWithGoogle should dispatch loginGoogleRequest', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch')

        component.loginWithGoogle()

        expect(dispatchSpy).toHaveBeenCalledWith(loginGoogleRequest()
        )
      })
    });
  })

});
