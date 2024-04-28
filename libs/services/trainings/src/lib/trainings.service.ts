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
    
    public getExerciseTemplateTrainingExercises(userId: string, exerciseTemplateId: string): Observable<Training[]> {
        return this.trainingsRefService.getExerciseTemplateTrainingExercisesDocRefs(userId, exerciseTemplateId, this.exerciseTemplateRefService.getExerciseTemplateDocRef(userId, exerciseTemplateId)).get().pipe(
            switchMap((collectionGroupQS: firebase.firestore.QuerySnapshot) => {
                const trainingExerciseObservables: Observable<Training>[] = [];
    
                [...new Set(collectionGroupQS.docs.map((doc) => doc.ref.parent.parent?.id))].map((trainingId) => {
                    if(trainingId) {
                        const trainingExerciseSeriesObservable = this.getTraining(userId, trainingId)
    
                        trainingExerciseObservables.push(trainingExerciseSeriesObservable);
                    }
                })
    
                return forkJoin(trainingExerciseObservables).pipe(
                    defaultIfEmpty([]),
                )
            }),
            catchError((error) => {
                console.log("error", error); throw error
            })
        )
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