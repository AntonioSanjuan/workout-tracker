import { Injectable, inject } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "@workout-tracker/services/auth";
import { logOutRequest, loginRequest, loginRequestError, loginRequestSuccess, getAnonymousUserDataRequest, getAuthenticatedUserDataRequest, signUpRequest, signUpRequestError, signUpRequestSuccess, updateUserDataRequest, setUserInfo, setAnonymousUser, getAuthenticatedUserDataRequestSuccess, getAnonymousUserDataRequestSuccess, updateUserDataRequestSuccess, loginGoogleRequest, loginGoogleRequestSuccess, loginGoogleRequestError, setAuthenticatedUser } from "./user.actions";
import { EMPTY, catchError, iif, map, of, switchMap } from "rxjs";
import { AppInit, getIsUILoadedApp, loadedApp, unloadedApp } from "../ui";
import firebase from 'firebase/compat/app/';
import { showError } from "../error-messages";
import { UserSettingsService } from '@workout-tracker/services/user-settings'
import { UserSettings } from "@workout-tracker/models";
import { getIsNewUser, getUser } from "./user.selectors";
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
                map((credentials) => loginRequestSuccess( {credentials: credentials })),
                catchError((err: firebase.FirebaseError) => of(loginRequestError({ error: err })))
            )
        )
    ))

    loginGoogleRequest$ = createEffect(() => this.actions$.pipe(
        ofType(loginGoogleRequest),
        switchMap(() =>
            this.authService.googleSignIn().pipe(
                map((credentials) => loginGoogleRequestSuccess({ credentials: Object.freeze(credentials)})),
                catchError((err: firebase.FirebaseError) => of(loginGoogleRequestError({ error: err })))
            )
        )
    ))

    loginRequestSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(loginRequestSuccess, loginGoogleRequestSuccess),
        switchMap(() =>
            of(loadedApp({initialized: AppInit.ACCOUNT}))
        )
    ))

    loginRequestError$ = createEffect(() => this.actions$.pipe(
        ofType(loginRequestError, loginGoogleRequestError),
        switchMap(({ error }) =>
            of(showError({errorMessage: error.code}))
        )
    ))

    signUpRequest$ = createEffect(() => this.actions$.pipe(
        ofType(signUpRequest),
        switchMap(({ userEmail, userPass }) =>
            this.authService.signUp(userEmail, userPass).pipe(
                map((credentials) => signUpRequestSuccess({ credentials: Object.freeze(credentials) })),
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

    checkNewUser$ = createEffect(() => this.actions$.pipe(
        ofType(signUpRequestSuccess, loginGoogleRequestSuccess, loginRequestSuccess),
        switchMap(({ credentials }) =>
            of(setUserInfo({
                isNewUser: this.authService.isNewUser(credentials),
                userName: credentials.additionalUserInfo?.username ?? undefined
            }))
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

    setAuthenticatedUser$ = createEffect(() => this.actions$.pipe(
        ofType(setAuthenticatedUser),
        switchMap(({user}) =>
            of(getAuthenticatedUserDataRequest({ user}))
        )
    ))

    setAnonymousUser$ = createEffect(() => this.actions$.pipe(
        ofType(setAnonymousUser),
        switchMap(() =>
            of(getAnonymousUserDataRequest())
        )
    ))


    getAuthenticatedUserDataRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getAuthenticatedUserDataRequest),
        concatLatestFrom(() => this.store.select(getIsNewUser)),
        switchMap(([{ user }, isNewUser]) =>
            (isNewUser ?
                this.userSettingsService.setUserSettings(user.uid):
                this.userSettingsService.getUserSettings(user.uid)
            ).pipe(
                map((userSettings: UserSettings) => 
                    getAuthenticatedUserDataRequestSuccess({ userSettings: userSettings})
                )

            )
        )
    ))

    getAnonymousUserDataRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getAnonymousUserDataRequest),
        switchMap(() =>
            this.userSettingsService.getAnonymousSettings()
            .pipe(
                map((userSettings: UserSettings) => 
                    getAnonymousUserDataRequestSuccess({ userSettings: userSettings})
                )

            )
        )
    ))

    userDataLoaded$ = createEffect(() => this.actions$.pipe(
        ofType(getAuthenticatedUserDataRequestSuccess, getAnonymousUserDataRequestSuccess),
        concatLatestFrom(() => this.store.select(getIsUILoadedApp)),
        switchMap(([_, isUILoadedApp]) =>
            iif(
                () => !isUILoadedApp,
                of(loadedApp({initialized: AppInit.UI})),
                EMPTY
            )
        )
    ))

    updateUserSettings$ = createEffect(() => this.actions$.pipe(
        ofType(updateUserDataRequest),
        concatLatestFrom(() => this.store.select(getUser)),
        switchMap(([{userSettings}, user]) =>
            (user ?
                this.userSettingsService.updateUserSettings(user.uid, userSettings):
                this.userSettingsService.updateAnonymousSettings(userSettings)
            ).pipe(
                map((userSettings: UserSettings) => 
                    updateUserDataRequestSuccess({ userSettings: userSettings})
                )

            )
        )
    ))

}