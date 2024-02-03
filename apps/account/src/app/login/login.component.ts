import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoginForm, loginForm } from './login.form';
import { FormGroup } from "@angular/forms";
import { loginRequest } from './store/login.actions';
import { LoginData } from './model/loginRequest.model';
import { UiModule } from '@workout-tracker/ui';
import { getIsUserLogged } from '@workout-tracker/shared-store'

@Component({
  selector: 'workout-tracker-login',
  templateUrl: './login.component.html',
  imports: [
    UiModule,
  ],
  styleUrls: ['./login.component.scss'],
  standalone: true
})
export class LoginComponent implements OnInit {
  private store = inject(Store)
  public loginForm!: FormGroup<LoginForm>
  public isUserLogged$ = this.store.select(getIsUserLogged)

  ngOnInit(): void {
      this.loginForm = loginForm()
  }

  login(): void {
    const loginData = {...this.loginForm?.getRawValue() } as LoginData
    if(loginData.userName && loginData.password){
      this.store.dispatch(loginRequest({ loginData }))
    }
  }
}
