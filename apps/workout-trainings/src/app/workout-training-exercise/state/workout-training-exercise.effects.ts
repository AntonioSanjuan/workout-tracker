import { Injectable, inject } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, of, mergeMap, iif, take, switchMap } from 'rxjs'
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { getTrainingById, getTrainingExercisesByExerciseTemplateId, getTrainingsByExerciseTemplateId, getUser, showError } from '@workout-tracker/shared-store';
import { AppRoutes, Training, TrainingExercise, TrainingExerciseSerie } from '@workout-tracker/models';
import { addAnonymousUserTrainingExerciseSerieRequest, addAnonymousUserTrainingExerciseSerieRequestSuccess, addAuthenticatedUserTrainingExerciseSerieRequest, addAuthenticatedUserTrainingExerciseSerieRequestError, addAuthenticatedUserTrainingExerciseSerieRequestSuccess, addUserTrainingExerciseSerieRequest, deleteAnonymousUserTrainingExerciseSerieRequest, deleteAnonymousUserTrainingExerciseSerieRequestSuccess, deleteAuthenticatedUserTrainingExerciseSerieRequest, deleteAuthenticatedUserTrainingExerciseSerieRequestError, deleteAuthenticatedUserTrainingExerciseSerieRequestSuccess, deleteUserTrainingExerciseSerieRequest, getAnonymousUserTrainingExercisePreviousTrainingRequest, getAnonymousUserTrainingExercisePreviousTrainingRequestSuccess, getAnonymousUserTrainingExerciseRequest, getAnonymousUserTrainingExerciseRequestError, getAnonymousUserTrainingExerciseRequestSuccess, getAuthenticatedUserTrainingExercisePreviousTrainingRequest, getAuthenticatedUserTrainingExercisePreviousTrainingRequestError, getAuthenticatedUserTrainingExercisePreviousTrainingRequestSuccess, getAuthenticatedUserTrainingExerciseRequest, getAuthenticatedUserTrainingExerciseRequestError, getAuthenticatedUserTrainingExerciseRequestSuccess, getUserTrainingExerciseRequest } from './workout-training-exercise.actions';
import { TrainingsService } from '@workout-tracker/services/trainings';
import { getWorkoutTrainingExerciseById } from '../../workout-training/state/workout-training.selectors';
import { selectWorkoutTrainingExerciseState } from './workout-training-exercise.selectors';

@Injectable()
export class TrainingExerciseEffects {
    private exercisesService: TrainingsService = inject(TrainingsService)
    private translateService: TranslateService = inject(TranslateService)
    private actions$: Actions = inject(Actions);
    private router: Router = inject(Router)
    private store: Store = inject(Store)

    getUserTrainingExerciseRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getUserTrainingExerciseRequest),
        concatLatestFrom(() => this.store.select(getUser)),
        mergeMap(([{ trainingId, trainingExerciseId }, user]) => 
            iif(
                () => !!user,
                of(getAuthenticatedUserTrainingExerciseRequest({ trainingId, trainingExerciseId })),
                of(getAnonymousUserTrainingExerciseRequest({ trainingId, trainingExerciseId }))
            )
        )
    ))
    getAuthenticatedUserTrainingExerciseRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getAuthenticatedUserTrainingExerciseRequest),
        concatLatestFrom(() => this.store.select(getUser)),
        mergeMap(([{ trainingId, trainingExerciseId }, user]) => this.exercisesService.getTrainingExercise(user?.uid as string, trainingId, trainingExerciseId).pipe(
            map((trainingExercise: TrainingExercise) => getAuthenticatedUserTrainingExerciseRequestSuccess({trainingId, trainingExercise: trainingExercise})),
            catchError(_ => {
                this.router.navigate([AppRoutes.WorkoutTrainingsList])
                return of(getAuthenticatedUserTrainingExerciseRequestError({ trainingExerciseId: trainingExerciseId }))}
            )
        ))
    ))

    getAnonymousUserTrainingExerciseRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getAnonymousUserTrainingExerciseRequest),
        mergeMap(({ trainingId, trainingExerciseId }) => 
            this.store.select(getWorkoutTrainingExerciseById(trainingExerciseId)).pipe(
            take(1),
            map((trainingExercise) => trainingExercise ? 
                getAnonymousUserTrainingExerciseRequestSuccess({ trainingId, trainingExercise }) : 
                getAnonymousUserTrainingExerciseRequestError({ trainingExerciseId: trainingExerciseId }))
            )
        )
    ))

    getTrainingExerciseRequestError$ = createEffect(() => this.actions$.pipe(
        ofType(
            getAnonymousUserTrainingExerciseRequestError, 
            getAuthenticatedUserTrainingExerciseRequestError
        ),
        map(({ trainingExerciseId }) => {
            return showError({errorMessage: `${this.translateService.instant('apps.workout-trainings.errors.trainingExerciseNotFound', 
            {
                trainingExerciseId: trainingExerciseId.toUpperCase(),
            }
            )}`})
        })
    ))

    //
    getTrainingExercisePreviousTrainingRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getAuthenticatedUserTrainingExerciseRequestSuccess, getAnonymousUserTrainingExerciseRequestSuccess),
        concatLatestFrom(() => this.store.select(getUser)),
        mergeMap(([{ trainingExercise }, user]) => 
            iif(
                () => !!user,
                of(getAuthenticatedUserTrainingExercisePreviousTrainingRequest({ trainingExercise: trainingExercise})),
                of(getAnonymousUserTrainingExercisePreviousTrainingRequest({ trainingExercise: trainingExercise}))
            )
        )
    ))

    getAuthenticatedUserTrainingExercisePreviousTrainingRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getAuthenticatedUserTrainingExercisePreviousTrainingRequest),
        concatLatestFrom(() => this.store.select(getUser)),
        mergeMap(([{ trainingExercise }, user]) => this.exercisesService.getPrevTrainingExercisesByExerciseTemplate(user?.uid as string, trainingExercise).pipe(
            map((trainingExercises: TrainingExercise[]) => getAuthenticatedUserTrainingExercisePreviousTrainingRequestSuccess({trainingExercises: trainingExercises})),
            catchError(_ => {
                this.router.navigate([AppRoutes.WorkoutExerciseTemplatesList])
                return of(getAuthenticatedUserTrainingExercisePreviousTrainingRequestError({ exerciseTemplateId: trainingExercise.exerciseTemplate.id }))}
            )
        ))
    ))
    
    getAnonymousUserTrainingExercisePreviousTrainingRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getAnonymousUserTrainingExercisePreviousTrainingRequest),
        mergeMap(({ trainingExercise }) => 
            this.store.select(getTrainingExercisesByExerciseTemplateId(trainingExercise.exerciseTemplate.id)).pipe(
            take(1),
            map((trainingExercises) => 
                getAnonymousUserTrainingExercisePreviousTrainingRequestSuccess({ trainingExercises: trainingExercises })
            )
        )
    )))

    getAuthenticatedUserTrainingExercisePreviousTrainingRequestError$ = createEffect(() => this.actions$.pipe(
        ofType(
            getAuthenticatedUserTrainingExercisePreviousTrainingRequestError
        ),
        map(({ exerciseTemplateId }) => {
            return showError({errorMessage: `${this.translateService.instant('apps.workout-exercises.errors.trainingExercisePreviousTrainingNotFound', 
            {
                exerciseTemplateId: exerciseTemplateId.toUpperCase(),
            }
            )}`})
        })
    ))

    //
    deleteUserTrainingExerciseSerieRequest$ = createEffect(() => this.actions$.pipe(
        ofType(deleteUserTrainingExerciseSerieRequest),
        concatLatestFrom(() => this.store.select(getUser)),
        mergeMap(([{ trainingExerciseSerie }, user]) => 
            iif(
                () => !!user,
                of(deleteAuthenticatedUserTrainingExerciseSerieRequest({ trainingExerciseSerie })),
                of(deleteAnonymousUserTrainingExerciseSerieRequest({ trainingExerciseSerie }))
            )
        )
    ))
    deleteAuthenticatedUserTrainingExerciseSerieRequest$ = createEffect(() => this.actions$.pipe(
        ofType(deleteAuthenticatedUserTrainingExerciseSerieRequest),
        concatLatestFrom(() => [this.store.select(getUser), this.store.select(selectWorkoutTrainingExerciseState)]),
        mergeMap(([{ trainingExerciseSerie }, user, workoutTrainingExerciseState ]) => this.exercisesService.deleteTrainingExerciseSerie(user?.uid as string, workoutTrainingExerciseState.trainingId as string, workoutTrainingExerciseState.trainingExercise?.id as string, trainingExerciseSerie).pipe(
            map((_) => deleteAuthenticatedUserTrainingExerciseSerieRequestSuccess({trainingExerciseSerie})),
            catchError(_ => {
                return of(deleteAuthenticatedUserTrainingExerciseSerieRequestError())}
            )
        ))
    ))

    deleteAnonymousUserTrainingExerciseSerieRequest$ = createEffect(() => this.actions$.pipe(
        ofType(deleteAnonymousUserTrainingExerciseSerieRequest),
        map(({ trainingExerciseSerie }) => 
            deleteAnonymousUserTrainingExerciseSerieRequestSuccess({ trainingExerciseSerie })
        )
    ))

    deletUserTrainingExerciseSerieRequestError$ = createEffect(() => this.actions$.pipe(
        ofType(deleteAuthenticatedUserTrainingExerciseSerieRequestError, ),
        map((_) => {
            return showError({errorMessage: `${this.translateService.instant('apps.workout-trainings.errors.deleteTrainingExerciseSerieError')}`})
        })
    ))

    addUserTrainingExerciseSerieRequest$ = createEffect(() => this.actions$.pipe(
        ofType(addUserTrainingExerciseSerieRequest),
        concatLatestFrom(() => this.store.select(getUser)),
        mergeMap(([{ trainingExerciseSerie }, user]) => 
            iif(
                () => !!user,
                of(addAuthenticatedUserTrainingExerciseSerieRequest({ trainingExerciseSerie: trainingExerciseSerie })),
                of(addAnonymousUserTrainingExerciseSerieRequest({ trainingExerciseSerie: trainingExerciseSerie }))
            )
        )
    ))
    addAuthenticatedUserTrainingExerciseSerieRequest$ = createEffect(() => this.actions$.pipe(
        ofType(addAuthenticatedUserTrainingExerciseSerieRequest),
        concatLatestFrom(() => [this.store.select(getUser),this.store.select(selectWorkoutTrainingExerciseState)]),
        switchMap(([{trainingExerciseSerie: trainingExerciseSerie}, user, workoutTrainingExerciseState]) => this.exercisesService.setTrainingExerciseSerie(user?.uid as string, workoutTrainingExerciseState.trainingId as string, workoutTrainingExerciseState.trainingExercise?.id as string, trainingExerciseSerie).pipe(
            map((trainingExerciseSerie: TrainingExerciseSerie) => addAuthenticatedUserTrainingExerciseSerieRequestSuccess({trainingExerciseSerie: trainingExerciseSerie})),
            catchError(_ => {
                return of(addAuthenticatedUserTrainingExerciseSerieRequestError())}
            )
        ))
    ))

    addAnonymousUserTrainingExerciseSerieRequest$ = createEffect(() => this.actions$.pipe(
        ofType(addAnonymousUserTrainingExerciseSerieRequest),
        mergeMap(({ trainingExerciseSerie }) => 
            of(addAnonymousUserTrainingExerciseSerieRequestSuccess({ trainingExerciseSerie: trainingExerciseSerie}))
        )
    ))

    addUserTrainingExerciseSerieRequestError$ = createEffect(() => this.actions$.pipe(
        ofType(
            addAuthenticatedUserTrainingExerciseSerieRequestError, 
        ),
        map(() => {
            return showError({errorMessage: `${this.translateService.instant('apps.workout-trainings.errors.trainingExerciseSerieCouldntBeCreated')}`})
        })
    ))
}