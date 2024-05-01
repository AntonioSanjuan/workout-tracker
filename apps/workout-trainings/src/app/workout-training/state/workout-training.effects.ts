import { Injectable, inject } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, of, mergeMap, iif, take, switchMap } from 'rxjs'
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ExerciseTemplatesService } from '@workout-tracker/services/exercise-templates';
import { Store } from '@ngrx/store';
import { getExerciseTemplateById, getTrainingById, getUser, showError } from '@workout-tracker/shared-store';
import { AppRoutes, ExerciseTemplate, Training, TrainingExercise } from '@workout-tracker/models';
import { addAnonymousUserTrainingExerciseRequest, addAnonymousUserTrainingExerciseRequestError, addAnonymousUserTrainingExerciseRequestSuccess, addAuthenticatedUserTrainingExerciseRequest, addAuthenticatedUserTrainingExerciseRequestError, addAuthenticatedUserTrainingExerciseRequestSuccess, addUserTrainingExerciseRequest, getAnonymousUserTrainingRequest, getAnonymousUserTrainingRequestError, getAnonymousUserTrainingRequestSuccess, getAuthenticatedUserTrainingRequest, getAuthenticatedUserTrainingRequestError, getAuthenticatedUserTrainingRequestSuccess, getUserTrainingRequest } from './workout-training.actions';
import { TrainingsService } from '@workout-tracker/services/trainings';
import { selectWorkoutTraining } from './workout-training.selectors';
@Injectable()
export class TrainingEffects {
    private exercisesService: TrainingsService = inject(TrainingsService)
    private translateService: TranslateService = inject(TranslateService)
    private actions$: Actions = inject(Actions);
    private router: Router = inject(Router)
    private store: Store = inject(Store)

    getUserTrainingDetailsRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getUserTrainingRequest),
        concatLatestFrom(() => this.store.select(getUser)),
        mergeMap(([{ trainingId }, user]) => 
            iif(
                () => !!user,
                of(getAuthenticatedUserTrainingRequest({ trainingId: trainingId })),
                of(getAnonymousUserTrainingRequest({ trainingId: trainingId }))
            )
        )
    ))
    getAuthenticatedUserTrainingDetailsRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getAuthenticatedUserTrainingRequest),
        concatLatestFrom(() => this.store.select(getUser)),
        mergeMap(([{ trainingId }, user]) => this.exercisesService.getTraining(user?.uid as string, trainingId).pipe(
            map((training: Training) => getAuthenticatedUserTrainingRequestSuccess({training: training})),
            catchError(_ => {
                this.router.navigate([AppRoutes.WorkoutTrainingsList])
                return of(getAuthenticatedUserTrainingRequestError({ trainingId: trainingId }))}
            )
        ))
    ))

    getAnonymousUserTrainingDetailsRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getAnonymousUserTrainingRequest),
        mergeMap(({ trainingId }) => 
            this.store.select(getTrainingById(trainingId)).pipe(
            take(1),
            map((training) => training ? 
                getAnonymousUserTrainingRequestSuccess({ training: training }) : 
                getAnonymousUserTrainingRequestError({ trainingId: trainingId }))
            )
        )
    ))

    getTrainingDetailsRequestError$ = createEffect(() => this.actions$.pipe(
        ofType(
            getAnonymousUserTrainingRequestError, 
            getAuthenticatedUserTrainingRequestError
        ),
        map(({ trainingId }) => {
            return showError({errorMessage: `${this.translateService.instant('apps.workout-trainings.errors.trainingNotFound', 
            {
                trainingId: trainingId.toUpperCase(),
            }
            )}`})
        })
    ))

    //
    addUserTrainingExerciseTrainingRequest$ = createEffect(() => this.actions$.pipe(
        ofType(addUserTrainingExerciseRequest),
        concatLatestFrom(() => this.store.select(getUser)),
        mergeMap(([{ trainingExercise }, user]) => 
            iif(
                () => !!user,
                of(addAuthenticatedUserTrainingExerciseRequest({ trainingExercise: trainingExercise })),
                of(addAnonymousUserTrainingExerciseRequest({ trainingExercise: trainingExercise }))
            )
        )
    ))
    addAuthenticatedUserTrainingExerciseRequest$ = createEffect(() => this.actions$.pipe(
        ofType(addAuthenticatedUserTrainingExerciseRequest),
        concatLatestFrom(() => [this.store.select(getUser), this.store.select(selectWorkoutTraining)]),
        switchMap(([{trainingExercise}, user, training]) => this.exercisesService.setTrainingExercise(user?.uid as string, training?.id as string, trainingExercise).pipe(
            map((trainingExercise: TrainingExercise) => addAuthenticatedUserTrainingExerciseRequestSuccess({trainingExercise: trainingExercise})),
            catchError(_ => {
                return of(addAuthenticatedUserTrainingExerciseRequestError())}
            )
        ))
    ))

    addAnonymousUserTrainingExerciseRequest$ = createEffect(() => this.actions$.pipe(
        ofType(addAnonymousUserTrainingExerciseRequest),
        mergeMap(({ trainingExercise }) => 
            of(addAnonymousUserTrainingExerciseRequestSuccess({ trainingExercise: trainingExercise}))
        )
    ))

    addUserTrainingExerciseRequestError$ = createEffect(() => this.actions$.pipe(
        ofType(
            addAuthenticatedUserTrainingExerciseRequestError, 
            addAnonymousUserTrainingExerciseRequestError
        ),
        map(() => {
            return showError({errorMessage: `${this.translateService.instant('apps.workout-trainings.errors.trainingExerciseCouldntBeCreated')}`})
        })
    ))
}