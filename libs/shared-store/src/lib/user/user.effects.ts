import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "@workout-tracker/services/auth";
import { logOutRequest, loginRequest, loginRequestError, loginRequestSuccess, fetchAnonymousUserData, fetchAuthenticatedUserData, setUserData, signUpRequest, signUpRequestError, signUpRequestSuccess } from "./user.actions";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { AppInit, loadedApp, unloadedApp } from "../ui";
import firebase from 'firebase/compat/app/';
import { showError } from "../error-messages";
import { UserSettingsService } from '@workout-tracker/services/user-settings'
import { UserSettings } from "@workout-tracker/models";

@Injectable()
export class UserEffects {
    private authService: AuthService = inject(AuthService)
    private userSettingsService: UserSettingsService = inject(UserSettingsService)
    private actions$ = inject(Actions);

    loginRequest$ = createEffect(() => this.actions$.pipe(
        ofType(loginRequest),
        switchMap(({ userEmail, userPass }) =>
            this.authService.logIn(userEmail, userPass).pipe(
                map((_) => loginRequestSuccess()),
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
                map((_) => signUpRequestSuccess()),
                catchError((err: firebase.FirebaseError) => of(signUpRequestError({ error: err })))
            )
        )
    ))

    signUpRequestSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(signUpRequestSuccess),
        switchMap(() =>
        //to-do -> replace for showSuccess(message) and delegate the AppInit.ACCOUNT into new action FETCH_USER_DATA
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
        //to-do -> replace for showSuccess(message) and delegate the AppInit.ACCOUNT into new action FETCH_USER_DATA
                map((_) => unloadedApp({uninitialized: AppInit.ACCOUNT})),
            )
        )
    ))

    setAuthenticatedUserData$ = createEffect(() => this.actions$.pipe(
        ofType(fetchAuthenticatedUserData),
        switchMap(({ user, isNewUser}) =>
            (isNewUser ?
                this.userSettingsService.setUserSettings(user.uid):
                this.userSettingsService.getUserSettings(user.uid)
            ).pipe(
                map((userSettings: UserSettings) => 
                    setUserData({ userSettings: userSettings})
                )

            )
        )
    ))

    setAnonymousUserData$ = createEffect(() => this.actions$.pipe(
        ofType(fetchAnonymousUserData),
        switchMap(() =>
            this.userSettingsService.getAnonymousSettings()
            .pipe(
                map((userSettings: UserSettings) => 
                    setUserData({ userSettings: userSettings})
                )

            )
        )
    ))

    setUserSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(setUserData),
        switchMap(() =>
            of(loadedApp({initialized: AppInit.ACCOUNT}))
        )
    ))

}