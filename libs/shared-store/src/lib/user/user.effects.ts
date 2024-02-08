import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "@workout-tracker/services/auth";
import { logOutRequest, loginRequest, loginRequestError, loginRequestSuccess } from "./user.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { AppInit, loadedApp, unloadedApp } from "../ui";
import firebase from 'firebase/compat/app/';

@Injectable()
export class UserEffects {
    private authService: AuthService = inject(AuthService)
    private actions$ = inject(Actions);

    loginRequest$ = createEffect(() => this.actions$.pipe(
        ofType(loginRequest),
        switchMap(({ userEmail, userPass }) =>
            this.authService.logIn(userEmail, userPass).pipe(
                map((loginResponse: firebase.auth.UserCredential) => loginRequestSuccess()),
                catchError(_ => of(loginRequestError()))
            )
        )
    ))

    loginRequestSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(loginRequestSuccess),
        switchMap(() =>
            of(loadedApp({initialized: AppInit.ACCOUNT}))
        )
    ))

    logOut$ = createEffect(() => this.actions$.pipe(
        ofType(logOutRequest),
        switchMap(() =>
            this.authService.logOut().pipe(
                map(() => unloadedApp({uninitialized: AppInit.ACCOUNT})),
            )
        )
    ))

}