import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpComponent } from './sign-up.component';
import { provideMockStore } from '@ngrx/store/testing';
import { accountAppStateMock } from '../+state/test/accountStateMock/accountStateMock.mock';
import { Store } from '@ngrx/store';
import { userStateMock } from '@workout-tracker/test'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignUpData } from './model/signUpRequest.model';
import { loginRequest } from '@workout-tracker/shared-store';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';

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
    describe('Login', () => {
      it('login with valid form should dispatch loginRequest', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch')

        const userNameSut = 'username test';
        const passwordSut = 'password test';

        component.signUpForm.setValue({
          userEmail: userNameSut,
          password: passwordSut
        })

        component.signUp()

        expect(dispatchSpy).toHaveBeenCalledWith(loginRequest({
          userEmail: userNameSut,
          userPass: passwordSut
         })
        )
      })
      it('login with invalid form should not dispatch loginRequest', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch')

        const userNameSut = 'username test';

        component.signUpForm.setValue({
          userEmail: userNameSut,
          password: null
        })

        component.signUp()

        expect(dispatchSpy).not.toHaveBeenCalledWith(loginRequest(expect.anything())
        )
      })
    });
  })

});
