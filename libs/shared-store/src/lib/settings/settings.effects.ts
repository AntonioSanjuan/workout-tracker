import { Injectable, inject } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { EMPTY, catchError, iif, map, of, switchMap } from "rxjs";
import { getAnonymousUserSettingsRequest, getAnonymousUserSettingsRequestSuccess, getAuthenticatedUserSettingsRequest, getAuthenticatedUserSettingsRequestError, getAuthenticatedUserSettingsRequestSuccess, updateUserSettingsRequest, updateUserSettingsRequestSuccess } from "./settings.actions";
import { UserSettingsService } from "@workout-tracker/services/user-settings";
import { Store } from "@ngrx/store";
import { getIsNewUser, getUser } from "../user";
import { UserSettings } from "@workout-tracker/models";
import { AppInit, getIsUILoadedApp, loadedApp } from "../ui";
import firebase from 'firebase/compat/app';

@Injectable()
export class SettingsEffects {
    private actions$ = inject(Actions);
    private userSettingsService: UserSettingsService = inject(UserSettingsService)
    private store: Store = inject(Store)

    getAuthenticatedUserSettingsRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getAuthenticatedUserSettingsRequest),
        concatLatestFrom(() => [ this.store.select(getUser), this.store.select(getIsNewUser), ]),
        switchMap(([_, user, isNewUser]) =>
            (isNewUser ?
                this.userSettingsService.setUserSettings(user?.uid as string):
                this.userSettingsService.getUserSettings(user?.uid as string)
            ).pipe(
                map((userSettings: UserSettings) => 
                    getAuthenticatedUserSettingsRequestSuccess({ userSettings: userSettings})
                ),
                catchError((err: firebase.FirebaseError) => of(getAuthenticatedUserSettingsRequestError({ error: err })))

            )
        )
    ))

    getAnonymousUserSettingsRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getAnonymousUserSettingsRequest),
        switchMap(() =>
            this.userSettingsService.getAnonymousSettings()
            .pipe(
                map((userSettings: UserSettings) => 
                    getAnonymousUserSettingsRequestSuccess({ userSettings: userSettings})
                )

            )
        )
    ))

    updateUserSettings$ = createEffect(() => this.actions$.pipe(
        ofType(updateUserSettingsRequest),
        concatLatestFrom(() => this.store.select(getUser)),
        switchMap(([{userSettings}, user]) =>
            (user ?
                this.userSettingsService.updateUserSettings(user.uid, userSettings):
                this.userSettingsService.updateAnonymousSettings(userSettings)
            ).pipe(
                map((userSettings: UserSettings) => 
                    updateUserSettingsRequestSuccess({ userSettings: userSettings})
                )
            )
        )
    ))

    UserSettingsLoaded$ = createEffect(() => this.actions$.pipe(
        ofType(getAuthenticatedUserSettingsRequestSuccess, getAnonymousUserSettingsRequestSuccess),
        concatLatestFrom(() => this.store.select(getIsUILoadedApp)),
        switchMap(([_, isUILoadedApp]) =>
            iif(
                () => !isUILoadedApp,
                of(loadedApp({initialized: AppInit.UI})),
                EMPTY
            )
        )
    ))
    
}