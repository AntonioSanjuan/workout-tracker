import { Injectable, inject } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/compat/firestore'
import { ExerciseAdapter } from "@workout-tracker/adapters";
import { Exercise, ExerciseDto } from "@workout-tracker/models";
import firebase from 'firebase/compat/app/';
import { Observable, from, map } from "rxjs";

@Injectable()
export class ExercisesService {
    private firebaseDataBase: AngularFirestore = inject(AngularFirestore)

    private getExercisesCollectionRef(userId: string): AngularFirestoreCollection {
        return this.firebaseDataBase.collection(`user/${userId}/exercises`)
    }

    public getExerciseDocRef(userId: string, exerciseId: string): AngularFirestoreDocument {
        return this.firebaseDataBase.doc(`user/${userId}/exercises/${exerciseId}`)
    }

    public getExercise(userId: string, exerciseId: string): Observable<Exercise> {
        return from(this.getExerciseDocRef(userId, exerciseId).get()).pipe(
            map((doc: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>) => {
                return ExerciseAdapter.toState({...doc.data() as ExerciseDto}, doc.id);
            })
        )
    }

    public getExercises(userId: string): Observable<Exercise[]> {
        return this.getExercisesCollectionRef(userId).get().pipe(
            map((querySnapshot: firebase.firestore.QuerySnapshot) => {
                return querySnapshot.docs.map((doc) => {
                    return ExerciseAdapter.toState({...doc.data() as ExerciseDto}, doc.id);
                })
            })
        )
    }

    public setExercises(userId: string, exercise: Exercise): Observable<Exercise> {
        const exerciseInput = ExerciseAdapter.toDto(exercise);
        return from(this.getExercisesCollectionRef(userId).add(exerciseInput)).pipe(
            map((doc: DocumentReference<firebase.firestore.DocumentData>) => {
                return ExerciseAdapter.toState({...exerciseInput as ExerciseDto}, doc.id);
            })
        )
    }

    public updateExercise(userId: string, exercise: Exercise): Observable<Exercise> {
        exercise.lastModification = new Date()
        const exerciseInput = ExerciseAdapter.toDto(exercise);

        return from(this.getExerciseDocRef(userId, exercise.id).update(exerciseInput)).pipe(
            map(() => {
                return {...exercise}
            })
        )
    }

    public deleteExercise(userId: string, exercise: Exercise): Observable<boolean> {
        return from(this.getExerciseDocRef(userId, exercise.id).delete()).pipe(
            map(() => true)
        )
    }
}