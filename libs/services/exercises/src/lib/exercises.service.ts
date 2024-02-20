import { Injectable, inject } from "@angular/core";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore'
import { UserSettings } from "@workout-tracker/models";
import firebase from 'firebase/compat/app/';
import { Observable, of } from "rxjs";
@Injectable()
export class ExercisesService {
    private firebaseDataBase: AngularFirestore = inject(AngularFirestore)

    private getExercisesDocRef(userId: string): AngularFirestoreDocument<UserSettings> {
        return this.firebaseDataBase.collection('user').doc(userId)
    }

    public getExercises(userId: string|undefined): Observable<any> {
        return of({})
    }

    public setExercises(userId: string|undefined, exercise: any): Observable<any> {
        return of({})  
    }

    public updateExercises(userId: string|undefined, exercise: any): Observable<any> {
        return of({})
    }

    public deleteExercise(userId: string|undefined): Observable<boolean> {
        return of(true)
    }
}