import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "@workout-tracker/services/auth";
import { logOutRequest, loginRequest, loginRequestError, loginRequestSuccess, signUpRequest, signUpRequestError, signUpRequestSuccess, setUserInfo, setAnonymousUser, loginGoogleRequest, loginGoogleRequestSuccess, loginGoogleRequestError, setAuthenticatedUser } from "./user.actions";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { initializeLoadedApps } from "../ui";
import firebase from 'firebase/compat/app/';
import { showError } from "../error-messages";
import { Store } from "@ngrx/store";
import { getAnonymousUserSettingsRequest, getAuthenticatedUserSettingsRequest, getUserSettingsRequest } from "../settings";
import { AppRoutes } from "@workout-tracker/models";
import { Router } from "@angular/router";

@Injectable()
export class UserEffects {
    private authService: AuthService = inject(AuthService)
    private store: Store = inject(Store);
    private router: Router = inject(Router);
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
            this.router.navigate([AppRoutes.Home]) 
        )
    ), { dispatch: false})

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
            this.router.navigate([AppRoutes.Home]) 
        )
    ), { dispatch: false})

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
                tap(() => this.router.navigate([AppRoutes.Home])) 
            )
        )
    ), { dispatch: false})

    setUser$ = createEffect(() => this.actions$.pipe(
        ofType(
            setAuthenticatedUser,
            setAnonymousUser
            ),
        switchMap(() =>
            of(initializeLoadedApps())
        )
    ))

    setUserSettings$ = createEffect(() => this.actions$.pipe(
        ofType(
            setAuthenticatedUser,
            setAnonymousUser
            ),
        switchMap(() =>
            of(getUserSettingsRequest())
        )
    ))
}