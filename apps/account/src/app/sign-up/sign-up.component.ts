import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { SignUpForm, signUpForm } from './sign-up.form';
import { FormGroup } from "@angular/forms";
import { SignUpData } from './model/signUpRequest.model';
import { UiModule } from '@workout-tracker/ui';
import { loginGoogleRequest, loginRequest, signUpRequest } from '@workout-tracker/shared-store'
import { TranslateModule } from '@ngx-translate/core';
import { AppRoutes } from '@workout-tracker/models'
import { RouterModule } from '@angular/router';

@Component({
  selector: 'workout-tracker-sign-up',
  templateUrl: './sign-up.component.html',
  imports: [
    UiModule,
    TranslateModule,
    RouterModule
  ],
  styleUrls: ['./sign-up.component.scss'],
  standalone: true
})
export class SignUpComponent implements OnInit {
  private store = inject(Store)
  public signUpForm!: FormGroup<SignUpForm>

  public appRoutes = AppRoutes

  ngOnInit(): void {
      this.signUpForm = signUpForm()
  }

  signUp(): void {
    const signUpData = {...this.signUpForm?.getRawValue() } as SignUpData
    if(signUpData.userEmail && signUpData.password){
      this.store.dispatch(signUpRequest({ userEmail: signUpData.userEmail, userPass: signUpData.password }))
    }
  }

  loginWithGoogle(): void {
    this.store.dispatch(loginGoogleRequest())
  }
}
