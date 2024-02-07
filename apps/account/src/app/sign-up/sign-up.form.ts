import { FormGroup, FormControl, Validators } from "@angular/forms";

export interface SignUpForm {
  userEmail: FormControl<string|null>
  password: FormControl<string|null>
}

export const signUpForm = (): FormGroup<SignUpForm> => new FormGroup<SignUpForm>({
  userEmail: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', Validators.required)
})