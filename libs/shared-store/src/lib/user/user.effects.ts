import { Injectable, inject } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "@workout-tracker/services/auth";
import { logOutRequest, loginRequest, loginRequestError, loginRequestSuccess, anonymousUserDataRequest, authenticatedUserDataRequest, setUserSettingsSuccess, signUpRequest, signUpRequestError, signUpRequestSuccess, updateUserSettings } from "./user.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { AppInit, loadedApp, unloadedApp } from "../ui";
import firebase from 'firebase/compat/app/';
import { showError } from "../error-messages";
import { UserSettingsService } from '@workout-tracker/services/user-settings'
import { UserSettings } from "@workout-tracker/models";
import { getUser } from "./user.selectors";
import { Store } from "@ngrx/store";

@Injectable()
export class UserEffects {
    private authService: AuthService = inject(AuthService)
    private userSettingsService: UserSettingsService = inject(UserSettingsService)
    private store: Store = inject(Store)
    private actions$ = inject(Actions);

    loginRequest$ = createEffect(() => this.actions$.pipe(
        ofType(loginRequest),
        switchMap(({ userEmail, userPass }) =>
            this.authService.logIn(userEmail, userPass).pipe(
                map(() => loginRequestSuccess()),
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
                map(() => signUpRequestSuccess()),
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

    authenticatedUserDataRequest$ = createEffect(() => this.actions$.pipe(
        ofType(authenticatedUserDataRequest),
        switchMap(({ user, isNewUser}) =>
            (isNewUser ?
                this.userSettingsService.setUserSettings(user.uid):
                this.userSettingsService.getUserSettings(user.uid)
            ).pipe(
                map((userSettings: UserSettings) => 
                    setUserSettingsSuccess({ userSettings: userSettings})
                )

            )
        )
    ))

    anonymousUserDataRequest$ = createEffect(() => this.actions$.pipe(
        ofType(anonymousUserDataRequest),
        switchMap(() =>
            this.userSettingsService.getAnonymousSettings()
            .pipe(
                map((userSettings: UserSettings) => 
                    setUserSettingsSuccess({ userSettings: userSettings})
                )

            )
        )
    ))

    setUserSettingsSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(setUserSettingsSuccess),
        switchMap(() =>
            of(loadedApp({initialized: AppInit.UI}))
        )
    ))

    updateUserSettings$ = createEffect(() => this.actions$.pipe(
        ofType(updateUserSettings),
        concatLatestFrom(() => this.store.select(getUser)),
        switchMap(([{userSettings}, user]) =>
            (user ?
                this.userSettingsService.updateUserSettings(user.uid, userSettings):
                this.userSettingsService.updateAnonymousSettings(userSettings)
            ).pipe(
                map((userSettings: UserSettings) => 
                    setUserSettingsSuccess({ userSettings: userSettings})
                )

            )
        )
    ))

}