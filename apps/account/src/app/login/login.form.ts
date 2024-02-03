import { FormGroup, FormControl, Validators } from "@angular/forms";

export interface LoginForm {
  userName: FormControl<string|null>
  password: FormControl<string|null>
}

export const loginForm = (): FormGroup<LoginForm> => new FormGroup<LoginForm>({
  userName: new FormControl('', Validators.required),
  password: new FormControl('', Validators.required)
})