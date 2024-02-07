import { FormGroup, FormControl, Validators } from "@angular/forms";

export interface LoginForm {
  userEmail: FormControl<string|null>
  password: FormControl<string|null>
}

export const loginForm = (): FormGroup<LoginForm> => new FormGroup<LoginForm>({
  userEmail: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', Validators.required)
})