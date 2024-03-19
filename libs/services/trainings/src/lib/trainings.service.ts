import { Injectable, inject } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/compat/firestore'
import { TrainingAdapter, TrainingExerciseAdapter, TrainingExerciseSerieAdapter } from "@workout-tracker/adapters";
import { Exercise, Training, TrainingDto, TrainingExercise, TrainingExerciseDto, TrainingExerciseSerieDto } from "@workout-tracker/models";
import firebase from 'firebase/compat/app/';
import { Observable, combineLatest, forkJoin, from, map, of, switchMap, tap } from "rxjs";

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
        console.log(`user/${userId}/trainings/${trainingId}/exercises/${trainingExerciseId}/series`)
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


    public getTrainings(userId: string): Observable<Training[]> {
        return this.getTrainingsCollectionRef(userId).get().pipe(
            switchMap((trainingsQS: firebase.firestore.QuerySnapshot) => {
                const observables: Observable<Training>[] = [];

                trainingsQS.forEach((trainingDoc) => {
                    const trainingId = trainingDoc.id;
                    const trainingData = trainingDoc.data() as TrainingDto;

                    const trainingExercisesObservable = this.getTrainingExercisesCollectionRef(userId, trainingId).get().pipe(
                        switchMap((trainingExercisesQS: firebase.firestore.QuerySnapshot) => {
                            const trainingExerciseObservables: Observable<TrainingExercise>[] = [];

                            trainingExercisesQS.forEach((trainingExerciseDoc) => {
                                const trainingExerciseId = trainingExerciseDoc.id;
                                const trainingExerciseData = trainingExerciseDoc.data() as TrainingExerciseDto;

                                const trainingExerciseSeriesObservable = combineLatest(trainingExerciseData.exerciseId.get() , this.getTrainingExerciseSeriesCollectionRef(userId, trainingId, trainingExerciseId).get()).pipe(
                                    map(([exerciseTemplateId, exerciseSeriesQS]: [firebase.firestore.DocumentSnapshot, firebase.firestore.QuerySnapshot]) => {
                                        const exerciseSeries = exerciseSeriesQS.docs.map((exerciseSeriesDoc) => TrainingExerciseSerieAdapter.toState(exerciseSeriesDoc.data() as TrainingExerciseSerieDto, exerciseSeriesDoc.id) );
                                        return {
                                            ...TrainingExerciseAdapter.toState(trainingExerciseData, trainingExerciseId, exerciseTemplateId.data() as Exercise),
                                            series: exerciseSeries
                                        } as TrainingExercise
                                    })
                                );
                                trainingExerciseObservables.push(trainingExerciseSeriesObservable);
                            });

                            return forkJoin(trainingExerciseObservables).pipe(
                                map((trainingExercises) => ({
                                    ...TrainingAdapter.toState(trainingData, trainingId),
                                    trainingExercises: trainingExercises
                                }))
                            );
                        })
                    );

                    observables.push(trainingExercisesObservable);
                });

                return forkJoin(observables).pipe(tap(_ => console.log("_", _)));
            })
        );
    }

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