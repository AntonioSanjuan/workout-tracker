import { Injectable, inject } from "@angular/core";
import { ExerciseTemplateAdapter, TrainingAdapter, TrainingExerciseAdapter, TrainingExerciseSerieAdapter } from "@workout-tracker/adapters";
import { ExerciseTemplate, ExerciseTemplateDto, Training, TrainingDto, TrainingExercise, TrainingExerciseDto, TrainingExerciseSerie, TrainingExerciseSerieDto, TrainingQuery } from "@workout-tracker/models";
import firebase from 'firebase/compat/app/';
import { Observable, catchError, combineLatest, defaultIfEmpty, forkJoin, from, map, switchMap } from "rxjs";
import { ExerciseTemplatesRefService } from '@workout-tracker/services/exercise-templates'
import { TrainingsRefService } from "./trainings-ref.service";

@Injectable()
export class TrainingsService {
    private exerciseTemplateRefService: ExerciseTemplatesRefService = inject(ExerciseTemplatesRefService)
    private trainingsRefService: TrainingsRefService = inject(TrainingsRefService)

    public getTraining(userId: string, trainingId: string): Observable<Training> {
        return this.trainingsRefService.getTrainingDocRef(userId, trainingId).get().pipe(
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
        return this.trainingsRefService.getTrainingsPaginatedCollectionRef(userId, query).get().pipe(
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
    
    public getPrevTrainingExercisesByExerciseTemplate(userId: string, trainingExercise: TrainingExercise): Observable<TrainingExercise[]> {
        return this.trainingsRefService.getExerciseTemplateTrainingExercisesDocRefs(
            this.exerciseTemplateRefService.getExerciseTemplateDocRef(userId, trainingExercise.exerciseTemplate.id), 
            1,
            trainingExercise.creationDate
        ).get().pipe(
            switchMap((collectionGroupQS: firebase.firestore.QuerySnapshot) => {
                const observables: Observable<TrainingExercise>[] = [];
                collectionGroupQS.docs.forEach((doc) => {
                    console.log("doc", doc)
                    const trainingId = doc.ref.parent.parent?.id

                    if(trainingId) {
                        const trainingExerciseSerieObservable = this.getTrainingExerciseSeries(userId, trainingId, doc.id).pipe(
                            map((trainingExerciseSeries) => 
                                TrainingExerciseAdapter.toState(
                                    doc.data() as TrainingExerciseDto, 
                                    doc.id, 
                                    trainingExercise.exerciseTemplate,
                                    trainingExerciseSeries
                                )
                            )
                        );
                        observables.push(trainingExerciseSerieObservable);
                    }

                })
                return forkJoin(observables).pipe(
                    defaultIfEmpty([]),
                )
            }),
            catchError((error) => {
                console.log("error", error); throw error
            })
        )
    }

    public getExerciseTemplateTrainings(userId: string, exerciseTemplateId: string): Observable<Training[]> {
        return this.trainingsRefService.getExerciseTemplateTrainingExercisesDocRefs(this.exerciseTemplateRefService.getExerciseTemplateDocRef(userId, exerciseTemplateId)).get().pipe(
            switchMap((collectionGroupQS: firebase.firestore.QuerySnapshot) => {
                const trainingObservables: Observable<Training>[] = [];
    
                [...new Set(collectionGroupQS.docs.map((doc) => doc.ref.parent.parent?.id))].map((trainingId) => {
                    if(trainingId) {
                        const trainingExerciseSeriesObservable = this.getTraining(userId, trainingId)
    
                        trainingObservables.push(trainingExerciseSeriesObservable);
                    }
                })
    
                return forkJoin(trainingObservables).pipe(
                    defaultIfEmpty([]),
                )
            }),
            catchError((error) => {
                console.log("error", error); throw error
            })
        )
    }
    
    public getTrainingExercise(userId: string, trainingId: string, trainingExerciseId: string): Observable<TrainingExercise> {
        return this.trainingsRefService.getTrainingExerciseDocRef(userId, trainingId, trainingExerciseId).get().pipe(
            switchMap((trainingExerciseDoc: firebase.firestore.DocumentSnapshot) => {
    
                const trainingExerciseId = trainingExerciseDoc.id;
                const trainingExerciseData = trainingExerciseDoc.data() as TrainingExerciseDto;
                return combineLatest(
                    trainingExerciseData.exerciseTemplateId.get(), 
                    this.getTrainingExerciseSeries(userId, trainingId, trainingExerciseId)
                ).pipe(
                    map(([exerciseTemplate, exerciseSeries]: [firebase.firestore.DocumentSnapshot, TrainingExerciseSerie[]]) => 
                        TrainingExerciseAdapter.toState(
                            trainingExerciseData, 
                            trainingExerciseId, 
                            ExerciseTemplateAdapter.toState(exerciseTemplate.data() as ExerciseTemplateDto, exerciseTemplate.id),
                            exerciseSeries
                        )
                    )
                );
            })
        );
    }

    private getTrainingExercises(userId: string, trainingId: string): Observable<TrainingExercise[]> {
        return this.trainingsRefService.getTrainingExercisesCollectionRef(userId, trainingId).get().pipe(
            switchMap((trainingExercisesQS: firebase.firestore.QuerySnapshot) => {
                const trainingExerciseObservables: Observable<TrainingExercise>[] = [];
    
                trainingExercisesQS.docs.forEach((trainingExerciseDoc) => {
                    const trainingExerciseId = trainingExerciseDoc.id;
                    const trainingExerciseData = trainingExerciseDoc.data() as TrainingExerciseDto;
                    const trainingExerciseSeriesObservable = combineLatest(
                        trainingExerciseData.exerciseTemplateId.get(), 
                        this.getTrainingExerciseSeries(userId, trainingId, trainingExerciseId)
                    ).pipe(
                        map(([exerciseTemplate, exerciseSeries]: [firebase.firestore.DocumentSnapshot, TrainingExerciseSerie[]]) => 
                            TrainingExerciseAdapter.toState(
                                trainingExerciseData, 
                                trainingExerciseId, 
                                ExerciseTemplateAdapter.toState(exerciseTemplate.data() as ExerciseTemplateDto, exerciseTemplate.id),
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
        return this.trainingsRefService.getTrainingExerciseSeriesCollectionRef(userId, trainingId, trainingExerciseId).get().pipe(
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
        return from(this.trainingsRefService.getTrainingsCollectionRef(userId).add(trainingInput)).pipe(
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
            this.exerciseTemplateRefService.getExerciseTemplateDocRef(userId, trainingExercise.exerciseTemplate.id).ref
        );
        return from(this.trainingsRefService.getTrainingExercisesCollectionRef(userId, trainingId).add(trainingExerciseInput)).pipe(
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
        return from(this.trainingsRefService.getTrainingExerciseSeriesCollectionRef(userId, trainingId, trainingExerciseId).add(trainingExerciseSerieInput)).pipe(
            map((trainingExercisesSerieDoc) => 
                TrainingExerciseSerieAdapter.toState(
                    trainingExerciseSerieInput, 
                    trainingExercisesSerieDoc.id
                )
            )
        )
    }

    public copyTraining(userId: string, training: Training): Observable<Training> {
        const today = new Date()
        const newTraining = {
            ...training,
            creationDate: today,
            finishDate: undefined
        }
        const newTrainingInput = TrainingAdapter.toDto(
            newTraining
        );

        return this.setTraining(userId, newTraining).pipe(
            switchMap((training: Training) => {
                return this.copyTrainingExercises(userId, training.id, newTraining.trainingExercises?.map((trainingExercise) => (
                    {
                        ...trainingExercise, 
                        creationDate: today
                    }))
                ).pipe(
                    map((copyTrainingExercises) => 
                        TrainingAdapter.toState(
                            newTrainingInput, 
                            training.id, 
                            copyTrainingExercises
                        )
                    )
                )
            })
        )
    }

    private copyTrainingExercises(userId: string, trainingId: string, trainingExercises: TrainingExercise[] | undefined): Observable<TrainingExercise[]> {
        const trainingExerciseObservables: Observable<TrainingExercise>[] = trainingExercises ? trainingExercises?.map((trainingExercise) => this.setTrainingExercise(userId, trainingId, trainingExercise)) : []

        return forkJoin(trainingExerciseObservables).pipe(
            defaultIfEmpty([]),
        )
    }

    public updateTraining(userId: string, training: Training): Observable<Training> {
        const exerciseInput = TrainingAdapter.toDto(training);

        return from(this.trainingsRefService.getTrainingDocRef(userId, training.id).update(exerciseInput)).pipe(
            map(() => {
                return {...training}
            })
        )
    }

    public updateTrainingExercise(userId: string, trainingId: string, trainingExercise: TrainingExercise): Observable<TrainingExercise> {
        const exerciseInput = TrainingExerciseAdapter.toDto(
            trainingExercise, 
            this.exerciseTemplateRefService.getExerciseTemplateDocRef(userId, trainingExercise.exerciseTemplate.id).ref
        );

        return from(this.trainingsRefService.getTrainingExerciseDocRef(userId, trainingId, trainingExercise.id).update(exerciseInput)).pipe(
            map(() => {
                return {...trainingExercise}
            })
        )
    }

    public updateTrainingExerciseSerie(userId: string, trainingId: string, trainingExerciseId: string, trainingExerciseSerie: TrainingExerciseSerie): Observable<TrainingExerciseSerie> {
        const exerciseInput = TrainingExerciseSerieAdapter.toDto(
            trainingExerciseSerie
        );

        return from(this.trainingsRefService.getTrainingExerciseSerieDocRef(userId, trainingId, trainingExerciseId, trainingExerciseSerie.id).update(exerciseInput)).pipe(
            map(() => {
                return {...trainingExerciseSerie}
            })
        )
    }

    public deleteTraining(userId: string, training: Training): Observable<boolean> {
        return from(this.trainingsRefService.getTrainingDocRef(userId, training.id).delete()).pipe(
            map(() => true)
        )
    }

    public deleteTrainingExercise(userId: string, trainingId: string, trainingExercise: TrainingExercise): Observable<boolean> {
        return from(this.trainingsRefService.getTrainingExerciseDocRef(userId, trainingId, trainingExercise.id).delete()).pipe(
            map(() => true)
        )
    }

    public deleteTrainingExerciseSerie(userId: string, trainingId: string, trainingExerciseId: string, trainingExerciseSerie: TrainingExerciseSerie): Observable<boolean> {
        return from(this.trainingsRefService.getTrainingExerciseSerieDocRef(userId, trainingId, trainingExerciseId, trainingExerciseSerie.id).delete()).pipe(
            map(() => true)
        )
    }
}