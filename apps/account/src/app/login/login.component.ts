import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoginForm, loginForm } from './login.form';
import { FormGroup } from "@angular/forms";
import { LoginData } from './model/loginRequest.model';
import { UiModule } from '@workout-tracker/ui';
import { getIsUserLogged, loginRequest } from '@workout-tracker/shared-store'
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'workout-tracker-login',
  templateUrl: './login.component.html',
  imports: [
    UiModule,
    TranslateModule
  ],
  styleUrls: ['./login.component.scss'],
  standalone: true
})
export class LoginComponent implements OnInit {
  private store = inject(Store)
  public loginForm!: FormGroup<LoginForm>

  ngOnInit(): void {
      this.loginForm = loginForm()
  }

  login(): void {
    const loginData = {...this.loginForm?.getRawValue() } as LoginData
    if(loginData.userEmail && loginData.password){
      this.store.dispatch(loginRequest({ userEmail: loginData.userEmail, userPass: loginData.password }))
    }
  }
}
