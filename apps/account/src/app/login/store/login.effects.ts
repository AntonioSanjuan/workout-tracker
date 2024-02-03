import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loginRequest, loginRequestError, loginRequestSuccess } from "./login.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { AuthService } from '@workout-tracker/services/auth'
import { UserCredential } from '@angular/fire/auth';
@Injectable()
export class LoginEffects {
    private authService: AuthService = inject(AuthService)
    private actions$: Actions = inject(Actions);

    loginRequest$ = createEffect(() => this.actions$.pipe(
        ofType(loginRequest),
        switchMap(({ loginData }) =>
            this.authService.logIn(loginData.userName, loginData.password).pipe(
                map((loginResponse: UserCredential) => loginRequestSuccess()),
                catchError(_ => of(loginRequestError()))
            )
        )
    ))
}