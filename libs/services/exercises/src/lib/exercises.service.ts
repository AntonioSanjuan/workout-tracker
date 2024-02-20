import { Injectable, inject } from "@angular/core";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore'
import { Exercise } from "@workout-tracker/models";
import firebase from 'firebase/compat/app/';
import { Observable, of } from "rxjs";
@Injectable()
export class ExercisesService {
    private firebaseDataBase: AngularFirestore = inject(AngularFirestore)

    private getExercisesDocRef(userId: string): AngularFirestoreDocument<Exercise> {
        return this.firebaseDataBase.collection('user').doc(userId)
    }

    public getExercises(userId: string|undefined): Observable<Exercise> {
        return of({} as Exercise)
    }

    public setExercises(userId: string|undefined, exercise: Exercise): Observable<Exercise> {
        return of({} as Exercise)  
    }

    public updateExercises(userId: string|undefined, exercise: Exercise): Observable<Exercise> {
        return of({} as Exercise)
    }

    public deleteExercise(userId: string|undefined): Observable<boolean> {
        return of(true)
    }
}