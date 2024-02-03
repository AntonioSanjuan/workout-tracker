import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { provideMockStore } from '@ngrx/store/testing';
import { accountAppStateMock } from '../+state/test/accountStateMock/accountStateMock.mock';
import { Store } from '@ngrx/store';
import { userStateMock } from '@workout-tracker/test'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { loginRequest } from './store/login.actions';
import { LoginData } from './model/loginRequest.model';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: {
            ...accountAppStateMock, 
            ...userStateMock
          }
        }),
      ],
      imports: [
        BrowserAnimationsModule,
        LoginComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
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

        component.loginForm.setValue({
          userName: userNameSut,
          password: passwordSut
        })

        component.login()

        expect(dispatchSpy).toHaveBeenCalledWith(loginRequest({
          loginData: {
            userName: userNameSut,
            password: passwordSut
          } as LoginData
         })
        )
      })
      it('login with invalid form should not dispatch loginRequest', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch')

        const userNameSut = 'username test';
        const passwordSut = 'password test';

        component.loginForm.setValue({
          userName: userNameSut,
          password: null
        })

        component.login()

        expect(dispatchSpy).not.toHaveBeenCalledWith(loginRequest(expect.anything())
        )
      })
    });
  })

});
