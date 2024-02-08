import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "@workout-tracker/services/auth";
import { logOutRequest, loginRequest, loginRequestError, loginRequestSuccess, signUpRequest, signUpRequestError, signUpRequestSuccess } from "./user.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { AppInit, loadedApp, unloadedApp } from "../ui";
import firebase from 'firebase/compat/app/';
import { showError } from "../error-messages";

@Injectable()
export class UserEffects {
    private authService: AuthService = inject(AuthService)
    private actions$ = inject(Actions);

    loginRequest$ = createEffect(() => this.actions$.pipe(
        ofType(loginRequest),
        switchMap(({ userEmail, userPass }) =>
            this.authService.logIn(userEmail, userPass).pipe(
                map((loginResponse: firebase.auth.UserCredential) => loginRequestSuccess()),
                catchError((err: firebase.FirebaseError) => of(loginRequestError({ error: err })))
            )
        )
    ))

    loginRequestSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(loginRequestSuccess),
        switchMap(() =>
            of(loadedApp({initialized: AppInit.ACCOUNT}))
        )
    ))

    loginRequestError$ = createEffect(() => this.actions$.pipe(
        ofType(loginRequestError),
        switchMap(({ error }) =>
            of(showError({errorMessage: error.code}))
        )
    ))

    signUpRequest$ = createEffect(() => this.actions$.pipe(
        ofType(signUpRequest),
        switchMap(({ userEmail, userPass }) =>
            this.authService.signUp(userEmail, userPass).pipe(
                map((loginResponse: firebase.auth.UserCredential) => signUpRequestSuccess()),
                catchError((err: firebase.FirebaseError) => of(signUpRequestError({ error: err })))
            )
        )
    ))

    signUpRequestSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(signUpRequestSuccess),
        switchMap(() =>
            of(loadedApp({initialized: AppInit.ACCOUNT}))
        )
    ))

    signUpRequestError$ = createEffect(() => this.actions$.pipe(
        ofType(signUpRequestError),
        switchMap(({ error }) =>
            of(showError({errorMessage: error.code}))
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