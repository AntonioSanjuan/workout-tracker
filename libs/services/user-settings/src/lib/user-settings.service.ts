import { Injectable, inject } from "@angular/core";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore'
import { UserSettings } from "@workout-tracker/models";
import firebase from 'firebase/compat/app/';
import { Observable, from, map, of } from "rxjs";
import { CultureService } from '@workout-tracker/services/culture'
@Injectable()
export class UserSettingsService {
    private firebaseDataBase: AngularFirestore = inject(AngularFirestore)
    private cultureService: CultureService = inject(CultureService);

    private getUserSettingsDocRef(userId: string):AngularFirestoreDocument<UserSettings> {
        return this.firebaseDataBase.collection('user').doc(userId)
    }

    private applyUserSettings(userSettings: UserSettings): void {
        this.cultureService.changeLanguage(userSettings.language)
        this.cultureService.changeDarkMode(userSettings.darkMode)
    }

    private getBrowserSettings(): UserSettings {
        return { 
            language: this.cultureService.getBrowserLanguage(),
            darkMode: this.cultureService.getBrowserIsDarkMode()
        } as UserSettings
    }

    public getAnonymousSettings(): Observable<UserSettings> {
        const browserSettings = this.getBrowserSettings()
        this.applyUserSettings(browserSettings)

        return of(browserSettings)
    }

    public getUserSettings(userId: string): Observable<UserSettings> {
        return this.getUserSettingsDocRef(userId).get().pipe(
            map((userSettingsResp: firebase.firestore.DocumentSnapshot<UserSettings>) => {
                const userSettings = userSettingsResp.data() as UserSettings
                this.applyUserSettings(userSettings)
                return userSettings;
            })
        )
    }

    public setUserSettings(userId: string): Observable<UserSettings> {
        const initialUserSettings: UserSettings = this.getBrowserSettings()
        return from(this.getUserSettingsDocRef(userId).set(initialUserSettings, {} as firebase.firestore.SetOptions)).pipe(
            map(() => {
                this.applyUserSettings(initialUserSettings)
                return initialUserSettings
            })
        )
    }

    public updateAnonymousSettings(userSettings: UserSettings): Observable<UserSettings> {
        this.applyUserSettings(userSettings)
        return of(userSettings)
    }

    public updateUserSettings(userId: string, userSettings: UserSettings): Observable<UserSettings> {
        return from(this.getUserSettingsDocRef(userId).update(userSettings)).pipe(
            map(() => {
                this.applyUserSettings(userSettings)
                return userSettings
            })
        )
    }

}