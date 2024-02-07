import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { SignUpForm, signUpForm } from './sign-up.form';
import { FormGroup } from "@angular/forms";
import { SignUpData } from './model/signUpRequest.model';
import { UiModule } from '@workout-tracker/ui';
import { getIsUserLogged, loginRequest } from '@workout-tracker/shared-store'
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'workout-tracker-sign-up',
  templateUrl: './sign-up.component.html',
  imports: [
    UiModule,
    TranslateModule
  ],
  styleUrls: ['./sign-up.component.scss'],
  standalone: true
})
export class SignUpComponent implements OnInit {
  private store = inject(Store)
  public signUpForm!: FormGroup<SignUpForm>

  ngOnInit(): void {
      this.signUpForm = signUpForm()
  }

  signUp(): void {
    const signUpData = {...this.signUpForm?.getRawValue() } as SignUpData
    if(signUpData.userEmail && signUpData.password){
      this.store.dispatch(loginRequest({ userEmail: signUpData.userEmail, userPass: signUpData.password }))
    }
  }
}
