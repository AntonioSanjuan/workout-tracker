import { Injectable, inject } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, of, mergeMap, iif, take } from 'rxjs'
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ExerciseTemplatesService } from '@workout-tracker/services/exercise-templates';
import { Store } from '@ngrx/store';
import { getExerciseTemplateById, getTrainingById, getUser, showError } from '@workout-tracker/shared-store';
import { AppRoutes, ExerciseTemplate, Training } from '@workout-tracker/models';
import { getAnonymousUserTrainingDetailsRequest, getAnonymousUserTrainingDetailsRequestError, getAnonymousUserTrainingDetailsRequestSuccess, getAuthenticatedUserTrainingDetailsRequest, getAuthenticatedUserTrainingDetailsRequestError, getAuthenticatedUserTrainingDetailsRequestSuccess, getUserTrainingDetailsRequest } from './workout-training.actions';
import { TrainingsService } from '@workout-tracker/services/trainings';
@Injectable()
export class TrainingEffects {
    private exercisesService: TrainingsService = inject(TrainingsService)
    private translateService: TranslateService = inject(TranslateService)
    private actions$: Actions = inject(Actions);
    private router: Router = inject(Router)
    private store: Store = inject(Store)

    getUserTrainingDetailsRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getUserTrainingDetailsRequest),
        concatLatestFrom(() => this.store.select(getUser)),
        mergeMap(([{ trainingId }, user]) => 
            iif(
                () => !!user,
                of(getAuthenticatedUserTrainingDetailsRequest({ trainingId: trainingId })),
                of(getAnonymousUserTrainingDetailsRequest({ trainingId: trainingId }))
            )
        )
    ))
    getAuthenticatedUserTrainingDetailsRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getAuthenticatedUserTrainingDetailsRequest),
        concatLatestFrom(() => this.store.select(getUser)),
        mergeMap(([{ trainingId }, user]) => this.exercisesService.getTraining(user?.uid as string, trainingId).pipe(
            map((training: Training) => getAuthenticatedUserTrainingDetailsRequestSuccess({training: training})),
            catchError(_ => {
                this.router.navigate([AppRoutes.WorkoutTrainingsList])
                return of(getAuthenticatedUserTrainingDetailsRequestError({ trainingId: trainingId }))}
            )
        ))
    ))

    getAnonymousUserTrainingDetailsRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getAnonymousUserTrainingDetailsRequest),
        mergeMap(({ trainingId }) => 
            this.store.select(getTrainingById(trainingId)).pipe(
            take(1),
            map((training) => training ? 
                getAnonymousUserTrainingDetailsRequestSuccess({ training: training }) : 
                getAnonymousUserTrainingDetailsRequestError({ trainingId: trainingId }))
            )
        )
    ))

    getTrainingDetailsRequestError$ = createEffect(() => this.actions$.pipe(
        ofType(
            getAnonymousUserTrainingDetailsRequestError, 
            getAuthenticatedUserTrainingDetailsRequestError
        ),
        map(({ trainingId }) => {
            return showError({errorMessage: `${this.translateService.instant('apps.workout-trainings.errors.trainingNotFound', 
            {
                trainingId: trainingId.toUpperCase(),
            }
            )}`})
        })
    ))
}