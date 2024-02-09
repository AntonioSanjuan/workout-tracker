import { Injectable, inject } from "@angular/core";
import { Store } from '@ngrx/store'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore'
import { UserSettings } from "@workout-tracker/models";
import firebase from 'firebase/compat/app/';
import { Observable, from, map } from "rxjs";

@Injectable()
export class UserSettingsService {
    private store: Store = inject(Store)
    private firebaseDataBase: AngularFirestore = inject(AngularFirestore)

    private getUserSettingsDocRef(userId: string):AngularFirestoreDocument<UserSettings> {
        return this.firebaseDataBase.collection('user').doc(userId)
    }

    public getUserSettings(userId: string): Observable<UserSettings> {
        return this.getUserSettingsDocRef(userId).get().pipe(
            map((userSettings: firebase.firestore.DocumentSnapshot<UserSettings>) => 
                userSettings.data() as UserSettings
            )
        )
    }

    public setUserSettings(userId: string): Observable<UserSettings> {
        const initialUserSettings: UserSettings = {
            language: '',
            darkMode: true
        }
        return from(this.getUserSettingsDocRef(userId).set(initialUserSettings, {} as firebase.firestore.SetOptions)).pipe(
            map((_) => {
                return initialUserSettings
            })
        )
    }

}