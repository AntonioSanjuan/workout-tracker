import { Injectable, inject } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/compat/firestore'
import { TrainingAdapter } from "@workout-tracker/adapters";
import { Training, TrainingDto } from "@workout-tracker/models";
import firebase from 'firebase/compat/app/';
import { Observable, combineLatest, forkJoin, from, map, mergeMap, of, switchMap, tap } from "rxjs";

@Injectable()
export class TrainingsService {
    private firebaseDataBase: AngularFirestore = inject(AngularFirestore)

    private getTrainingsCollectionRef(userId: string): AngularFirestoreCollection {
        return this.firebaseDataBase.collection(`user/${userId}/trainings`)
    }

    private getTrainingExercisesCollectionRef(userId: string, trainingId: string): AngularFirestoreCollection {
        return this.firebaseDataBase.collection(`user/${userId}/trainings/${trainingId}/exercises`)
    }

    private getTrainingExerciseSeriesCollectionRef(userId: string, trainingId: string, trainingExerciseId: string): AngularFirestoreCollection {
        return this.firebaseDataBase.collection(`user/${userId}/trainings/${trainingId}/exercises/${trainingExerciseId}/series`)
    }

    private getTrainingDocRef(userId: string, trainingId: string): AngularFirestoreDocument {
        return this.firebaseDataBase.doc(`user/${userId}/trainings/${trainingId}`)
    }

    private getTrainingExerciseDocRef(userId: string, trainingId: string, trainingExerciseId: string): AngularFirestoreDocument {
        return this.firebaseDataBase.doc(`user/${userId}/trainings/${trainingId}/exercises/${trainingExerciseId}`)
    }

    private getTrainingExerciseSerieDocRef(userId: string, trainingId: string, trainingExerciseId: string, serieId: string): AngularFirestoreDocument {
        return this.firebaseDataBase.doc(`user/${userId}/trainings/${trainingId}/exercises/${trainingExerciseId}/series/${serieId}`)
    }

    public getTraining(userId: string, trainingId: string): Observable<Training> {
        return from(this.getTrainingDocRef(userId, trainingId).get()).pipe(
            map((doc: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>) => {
                return TrainingAdapter.toState({...doc.data() as TrainingDto}, doc.id);
            })
        )
    }


    public getTrainings(userId: string): Observable<any> {
        return of([])
    }

    // public getTrainings(userId: string): Observable<any> {
    //     return this.getTrainingsCollectionRef(userId).get().pipe(
    //         switchMap((traininsgQS: firebase.firestore.QuerySnapshot) => {
    //             const trainings = traininsgQS.docs.map((trainingDoc) => ({ id: trainingDoc.id, data: trainingDoc.data() }) )
    //             const observables = trainings.map((training) => {
    //                 return this.getTrainingExercisesCollectionRef(userId, training.id).get().pipe(
    //                     map((trainingExercisesQS: firebase.firestore.QuerySnapshot) => {
    //                         return {
    //                             trainingId: training.id,
    //                             exercises: trainingExercisesQS.docs.map((exerciseDoc) => ({ id: exerciseDoc.id, data: exerciseDoc.data() }))
    //                         };
    //                     })
    //                 );
    //             });
    //             return forkJoin(observables).pipe(
    //                 tap(_ => console.log("_", _))
    //             );
    //         })
    //     )
    // }

    public setTrainings(userId: string, training: Training): Observable<Training> {
        const TrainingInput = TrainingAdapter.toDto(training);
        return from(this.getTrainingsCollectionRef(userId).add(TrainingInput)).pipe(
            map((doc: DocumentReference<firebase.firestore.DocumentData>) => {
                return TrainingAdapter.toState({...TrainingInput as TrainingDto}, doc.id);
            })
        )
    }

    public updateTraining(userId: string, training: Training): Observable<Training> {
        const exerciseInput = TrainingAdapter.toDto(training);

        return from(this.getTrainingDocRef(userId, training.id).update(exerciseInput)).pipe(
            map(() => {
                return {...training}
            })
        )
    }

    public deleteTraining(userId: string, training: Training): Observable<boolean> {
        return from(this.getTrainingDocRef(userId, training.id).delete()).pipe(
            map(() => true)
        )
    }
}