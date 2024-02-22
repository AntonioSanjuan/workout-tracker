import { Injectable, inject } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { map, of, switchMap } from "rxjs";
import { getAnonymousUserSettingsRequest, getAnonymousUserSettingsRequestSuccess, getAuthenticatedUserSettingsRequest, getAuthenticatedUserSettingsRequestSuccess, updateUserSettingsRequest, updateUserSettingsRequestSuccess } from "./settings.actions";
import { UserSettingsService } from "@workout-tracker/services/user-settings";
import { Store } from "@ngrx/store";
import { getIsNewUser, getUser } from "../user";
import { UserSettings } from "@workout-tracker/models";

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
                )

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
    
}