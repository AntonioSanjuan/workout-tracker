import { Injectable, inject } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, QueryFn } from '@angular/fire/compat/firestore'
import { DateAdapter, TrainingAdapter, TrainingExerciseAdapter, TrainingExerciseSerieAdapter } from "@workout-tracker/adapters";
import { Exercise, Training, TrainingDto, TrainingExercise, TrainingExerciseDto, TrainingExerciseSerie, TrainingExerciseSerieDto, TrainingQuery } from "@workout-tracker/models";
import firebase from 'firebase/compat/app/';
import { Observable, catchError, combineLatest, defaultIfEmpty, forkJoin, from, map, switchMap } from "rxjs";
import { ExercisesService } from '@workout-tracker/services/exercises'

@Injectable()
export class TrainingsService {
    private firebaseDataBase: AngularFirestore = inject(AngularFirestore)
    private exerciseService: ExercisesService = inject(ExercisesService)

    private getTrainingsPaginatedQuery(userId: string, trainingQuery: TrainingQuery): QueryFn {
        const trainingsPaginatedQuery: QueryFn = ref => {
            let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;

            //filters
            if (trainingQuery.filters.betweenDates) { 
                console.log("trainingQuery.filters.betweenDates", trainingQuery.filters.betweenDates)
                query = query.where('creationDate', ">=", DateAdapter.toDto(trainingQuery.filters.betweenDates.fromDate)).where('creationDate', "<=",  DateAdapter.toDto(trainingQuery.filters.betweenDates.toDate)) 
            }
            if (trainingQuery.filters.muscleGroups.length) { 
                console.log("trainingQuery.filters.muscleGroups", trainingQuery.filters.muscleGroups)
                query = query.where('muscleGroups', "array-contains-any", trainingQuery.filters.muscleGroups) 
                
            }

            // Aplicar ordenamiento
            query = query
                .limit(trainingQuery.pagination.pageElements)
                .orderBy('creationDate', 'desc')

            //pagination
            if (trainingQuery.pagination.lastElement) { 
                query = query.startAt(DateAdapter.toDto(trainingQuery.pagination.lastElement.creationDate)) 
            }
            
            return query
        }
        return trainingsPaginatedQuery;
    }
    
    private getTrainingsCollectionRef(userId: string): AngularFirestoreCollection {
        return this.firebaseDataBase.collection(`user/${userId}/trainings`)
    }

    private getTrainingsPaginatedCollectionRef(userId: string, trainingQuery: TrainingQuery): AngularFirestoreCollection {
        const firestoreQuery = this.getTrainingsPaginatedQuery(userId, trainingQuery)
        return this.firebaseDataBase.collection(`user/${userId}/trainings`, firestoreQuery)
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

    private getTrainingExerciseSerieDocRef(userId: string, trainingId: string, trainingExerciseId: string, trainingExerciseSerieId: string): AngularFirestoreDocument {
        return this.firebaseDataBase.doc(`user/${userId}/trainings/${trainingId}/exercises/${trainingExerciseId}/series/${trainingExerciseSerieId}`)
    }

    public getTraining(userId: string, trainingId: string): Observable<Training> {
        return this.getTrainingDocRef(userId, trainingId).get().pipe(
            switchMap((trainingDoc: firebase.firestore.DocumentSnapshot) => {  
                const trainingId = trainingDoc.id;
                const trainingData = trainingDoc.data() as TrainingDto;

                return this.getTrainingExercises(userId, trainingId).pipe(
                    map((trainingExercises) => 
                        TrainingAdapter.toState(
                            trainingData, 
                            trainingId, 
                            trainingExercises
                        )
                    
                    )
                );
            })
        );
    }

    public getTrainings(userId: string, query: TrainingQuery): Observable<Training[]> {
        return this.getTrainingsPaginatedCollectionRef(userId, query).get().pipe(
            switchMap((trainingsQS: firebase.firestore.QuerySnapshot) => {
                const observables: Observable<Training>[] = [];
                trainingsQS.docs.forEach((trainingDoc) => {
                    const trainingId = trainingDoc.id;
                    const trainingData = trainingDoc.data() as TrainingDto;
    
                    const trainingExercisesObservable = this.getTrainingExercises(userId, trainingId).pipe(
                        map((trainingExercises) => 
                             TrainingAdapter.toState(
                                trainingData, 
                                trainingId, 
                                trainingExercises
                            )
                        )
                    );
                    observables.push(trainingExercisesObservable);
                });
                return forkJoin(observables).pipe(
                    defaultIfEmpty([]),
                )
            }),
            catchError((error) => {
                console.log("error", error); throw error
            })
        );
    }
    
    private getTrainingExercises(userId: string, trainingId: string): Observable<TrainingExercise[]> {
        return this.getTrainingExercisesCollectionRef(userId, trainingId).get().pipe(
            switchMap((trainingExercisesQS: firebase.firestore.QuerySnapshot) => {
                const trainingExerciseObservables: Observable<TrainingExercise>[] = [];
    
                trainingExercisesQS.docs.forEach((trainingExerciseDoc) => {
                    const trainingExerciseId = trainingExerciseDoc.id;
                    const trainingExerciseData = trainingExerciseDoc.data() as TrainingExerciseDto;
    
                    const trainingExerciseSeriesObservable = combineLatest(
                        trainingExerciseData.exerciseTemplateId.get(), 
                        this.getTrainingExerciseSeries(userId, trainingId, trainingExerciseId)
                    ).pipe(
                        map(([exerciseTemplateId, exerciseSeries]: [firebase.firestore.DocumentSnapshot, TrainingExerciseSerie[]]) => 
                            TrainingExerciseAdapter.toState(
                                trainingExerciseData, 
                                trainingExerciseId, 
                                exerciseTemplateId.data() as Exercise, 
                                exerciseSeries
                            )
                        )
                    );
    
                    trainingExerciseObservables.push(trainingExerciseSeriesObservable);
                });
    
                return forkJoin(trainingExerciseObservables).pipe(
                    defaultIfEmpty([]),
                )
            })
        );
    }
    
    private getTrainingExerciseSeries(userId: string, trainingId: string, trainingExerciseId: string): Observable<TrainingExerciseSerie[]> {
        return this.getTrainingExerciseSeriesCollectionRef(userId, trainingId, trainingExerciseId).get().pipe(
            map((exerciseSeriesQS: firebase.firestore.QuerySnapshot) => 
                exerciseSeriesQS.docs.map((exerciseSeriesDoc) => 
                    TrainingExerciseSerieAdapter.toState(
                        exerciseSeriesDoc.data() as TrainingExerciseSerieDto, 
                        exerciseSeriesDoc.id
                    )
                )
            )
        );
    }

    public setTraining(userId: string, training: Training): Observable<Training> {
        const trainingInput = TrainingAdapter.toDto(training);
        return from(this.getTrainingsCollectionRef(userId).add(trainingInput)).pipe(
            map((trainingExercisesDoc) => 
                TrainingAdapter.toState(
                    trainingInput, 
                    trainingExercisesDoc.id, 
                    []
                )
            )
        )
    }

    public setTrainingExercise(userId: string, trainingId: string, trainingExercise: TrainingExercise): Observable<TrainingExercise> {
        const trainingExerciseInput = TrainingExerciseAdapter.toDto(
            trainingExercise, 
            this.exerciseService.getExerciseDocRef(userId, trainingExercise.exerciseTemplate.id).ref
        );
        return from(this.getTrainingExercisesCollectionRef(userId, trainingId).add(trainingExerciseInput)).pipe(
            map((trainingExercisesDoc) => 
                TrainingExerciseAdapter.toState(
                    trainingExerciseInput, 
                    trainingExercisesDoc.id,
                    trainingExercise.exerciseTemplate,
                    []
                )
            )
        )
    }

    public setTrainingExerciseSerie(userId: string, trainingId: string, trainingExerciseId: string, trainingExerciseSerie: TrainingExerciseSerie): Observable<TrainingExerciseSerie> {
        const trainingExerciseSerieInput = TrainingExerciseSerieAdapter.toDto(
            trainingExerciseSerie
        );
        return from(this.getTrainingExerciseSeriesCollectionRef(userId, trainingId, trainingExerciseId).add(trainingExerciseSerieInput)).pipe(
            map((trainingExercisesSerieDoc) => 
                TrainingExerciseSerieAdapter.toState(
                    trainingExerciseSerieInput, 
                    trainingExercisesSerieDoc.id
                )
            )
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

    public updateTrainingExercise(userId: string, trainingId: string, trainingExercise: TrainingExercise): Observable<TrainingExercise> {
        const exerciseInput = TrainingExerciseAdapter.toDto(
            trainingExercise, 
            this.exerciseService.getExerciseDocRef(userId, trainingExercise.exerciseTemplate.id).ref
        );

        return from(this.getTrainingExerciseDocRef(userId, trainingId, trainingExercise.id).update(exerciseInput)).pipe(
            map(() => {
                return {...trainingExercise}
            })
        )
    }

    public updateTrainingExerciseSerie(userId: string, trainingId: string, trainingExerciseId: string, trainingExerciseSerie: TrainingExerciseSerie): Observable<TrainingExerciseSerie> {
        const exerciseInput = TrainingExerciseSerieAdapter.toDto(
            trainingExerciseSerie
        );

        return from(this.getTrainingExerciseSerieDocRef(userId, trainingId, trainingExerciseId, trainingExerciseSerie.id).update(exerciseInput)).pipe(
            map(() => {
                return {...trainingExerciseSerie}
            })
        )
    }

    public deleteTraining(userId: string, training: Training): Observable<boolean> {
        return from(this.getTrainingDocRef(userId, training.id).delete()).pipe(
            map(() => true)
        )
    }

    public deleteTrainingExercise(userId: string, trainingId: string, trainingExercise: TrainingExercise): Observable<boolean> {
        return from(this.getTrainingExerciseDocRef(userId, trainingId, trainingExercise.id).delete()).pipe(
            map(() => true)
        )
    }

    public deleteTrainingExerciseSerie(userId: string, trainingId: string, trainingExerciseId: string, trainingExerciseSerie: TrainingExerciseSerie): Observable<boolean> {
        return from(this.getTrainingExerciseSerieDocRef(userId, trainingId, trainingExerciseId, trainingExerciseSerie.id).delete()).pipe(
            map(() => true)
        )
    }
}