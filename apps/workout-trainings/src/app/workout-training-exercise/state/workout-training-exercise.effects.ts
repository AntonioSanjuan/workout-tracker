import { Injectable, inject } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, of, mergeMap, iif, take, switchMap } from 'rxjs'
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { getTrainingById, getUser, showError } from '@workout-tracker/shared-store';
import { AppRoutes, TrainingExercise, TrainingExerciseSerie } from '@workout-tracker/models';
import { addAnonymousUserTrainingExerciseSerieRequest, addAnonymousUserTrainingExerciseSerieRequestError, addAnonymousUserTrainingExerciseSerieRequestSuccess, addAuthenticatedUserTrainingExerciseSerieRequest, addAuthenticatedUserTrainingExerciseSerieRequestError, addAuthenticatedUserTrainingExerciseSerieRequestSuccess, addUserTrainingExerciseSerieRequest, getAnonymousUserTrainingExerciseRequest, getAnonymousUserTrainingExerciseRequestError, getAnonymousUserTrainingExerciseRequestSuccess, getAuthenticatedUserTrainingExerciseRequest, getAuthenticatedUserTrainingExerciseRequestError, getAuthenticatedUserTrainingExerciseRequestSuccess, getUserTrainingExerciseRequest } from './workout-training-exercise.actions';
import { TrainingsService } from '@workout-tracker/services/trainings';
import { getWorkoutTrainingExerciseById } from '../../workout-training/state/workout-training.selectors';
import { selectWorkoutTrainingExercise, selectWorkoutTrainingExerciseParentId } from './workout-training-exercise.selectors';

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
    addUserTrainingExerciseTrainingRequest$ = createEffect(() => this.actions$.pipe(
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
    addAuthenticatedUserTrainingExerciseRequest$ = createEffect(() => this.actions$.pipe(
        ofType(addAuthenticatedUserTrainingExerciseSerieRequest),
        concatLatestFrom(() => [this.store.select(getUser), this.store.select(selectWorkoutTrainingExerciseParentId), this.store.select(selectWorkoutTrainingExercise)]),
        switchMap(([{trainingExerciseSerie: trainingExerciseSerie}, user, trainingId, trainingExercise]) => this.exercisesService.setTrainingExerciseSerie(user?.uid as string, trainingId as string, trainingExercise?.id as string, trainingExerciseSerie).pipe(
            map((trainingExerciseSerie: TrainingExerciseSerie) => addAuthenticatedUserTrainingExerciseSerieRequestSuccess({trainingExerciseSerie: trainingExerciseSerie})),
            catchError(_ => {
                return of(addAuthenticatedUserTrainingExerciseSerieRequestError())}
            )
        ))
    ))

    addAnonymousUserTrainingExerciseRequest$ = createEffect(() => this.actions$.pipe(
        ofType(addAnonymousUserTrainingExerciseSerieRequest),
        mergeMap(({ trainingExerciseSerie }) => 
            of(addAnonymousUserTrainingExerciseSerieRequestSuccess({ trainingExerciseSerie: trainingExerciseSerie}))
        )
    ))

    addUserTrainingExerciseRequestError$ = createEffect(() => this.actions$.pipe(
        ofType(
            addAuthenticatedUserTrainingExerciseSerieRequestError, 
            addAnonymousUserTrainingExerciseSerieRequestError
        ),
        map(() => {
            return showError({errorMessage: `${this.translateService.instant('apps.workout-trainings.errors.trainingExerciseSerieCouldntBeCreated')}`})
        })
    ))
}