import { Injectable, inject } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/compat/firestore'
import { Exercise } from "@workout-tracker/models";
import firebase from 'firebase/compat/app/';
import { Observable, from, map, of } from "rxjs";

@Injectable()
export class ExercisesService {
    private firebaseDataBase: AngularFirestore = inject(AngularFirestore)

    private getExercisesCollectionRef(userId: string): AngularFirestoreCollection {
        return this.firebaseDataBase.collection(`user/${userId}/exercises`)
    }

    private getExerciseDocRef(userId: string, exerciseId: string): AngularFirestoreDocument {
        return this.firebaseDataBase.doc(`user/${userId}/exercises/${exerciseId}`)
    }

    public getExercises(userId: string): Observable<Exercise[]> {
        return this.getExercisesCollectionRef(userId).get().pipe(
            map((querySnapshot: firebase.firestore.QuerySnapshot) => {
                return querySnapshot.docs.map((doc) => {
                    return {
                        ...doc.data() as Exercise,
                        id:doc.id
                    }
                })
            })
        )
    }

    public setExercises(userId: string, exercise: Exercise): Observable<Exercise> {
        return from(this.getExercisesCollectionRef(userId).add(exercise)).pipe(
            map((doc: DocumentReference<firebase.firestore.DocumentData>) => {
                return {
                    ...exercise,
                    id: doc.id
                }
            })
        )
    }

    public updateExercise(userId: string, exercise: Exercise): Observable<Exercise> {
        return from(this.getExerciseDocRef(userId, exercise.id).update(exercise)).pipe(
            map(() => {
                return exercise
            })
        )
    }

    public deleteExercise(userId: string, exercise: Exercise): Observable<boolean> {
        return from(this.getExerciseDocRef(userId, exercise.id).delete()).pipe(
            map(() => true)
        )
    }
}