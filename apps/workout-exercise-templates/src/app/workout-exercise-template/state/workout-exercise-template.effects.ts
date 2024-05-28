import { Injectable, inject } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, of, mergeMap, iif, take, finalize } from 'rxjs'
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ExerciseTemplatesService } from '@workout-tracker/services/exercise-templates';
import { Store } from '@ngrx/store';
import { getExerciseTemplateById, getTrainingsByExerciseTemplateId, getUser, showError } from '@workout-tracker/shared-store';
import { AppRoutes, ExerciseTemplate, Training, TrainingExercise } from '@workout-tracker/models';
import { getAnonymousUserExerciseTemplateDetailsRequest, getAnonymousUserExerciseTemplateDetailsRequestError, getAnonymousUserExerciseTemplateDetailsRequestSuccess, getAnonymousUserExerciseTemplateTrainingsDetailsRequest, getAnonymousUserExerciseTemplateTrainingsDetailsRequestError, getAnonymousUserExerciseTemplateTrainingsDetailsRequestSuccess, getAuthenticatedUserExerciseTemplateDetailsRequest, getAuthenticatedUserExerciseTemplateDetailsRequestError, getAuthenticatedUserExerciseTemplateDetailsRequestSuccess, getAuthenticatedUserExerciseTemplateTrainingsDetailsRequest, getAuthenticatedUserExerciseTemplateTrainingsDetailsRequestError, getAuthenticatedUserExerciseTemplateTrainingsDetailsRequestSuccess, getUserExerciseTemplateDetailsRequest } from './workout-exercise-template.actions';
import { TrainingsService } from '@workout-tracker/services/trainings';
@Injectable()
export class WorkoutExerciseTemplatesEffects {
    private exerciseTemplatesService: ExerciseTemplatesService = inject(ExerciseTemplatesService)
    private trainingService: TrainingsService = inject(TrainingsService)
    private translateService: TranslateService = inject(TranslateService)
    private actions$: Actions = inject(Actions);
    private router: Router = inject(Router)
    private store: Store = inject(Store)

    getUserExerciseTemplateDetailsRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getUserExerciseTemplateDetailsRequest),
        concatLatestFrom(() => this.store.select(getUser)),
        mergeMap(([{ exerciseId }, user]) => 
            iif(
                () => !!user,
                of(getAuthenticatedUserExerciseTemplateDetailsRequest({ exerciseId: exerciseId})),
                of(getAnonymousUserExerciseTemplateDetailsRequest({ exerciseId: exerciseId}))
            )
        )
    ))

    getAuthenticatedUserExerciseTemplateDetailsRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getAuthenticatedUserExerciseTemplateDetailsRequest),
        concatLatestFrom(() => this.store.select(getUser)),
        mergeMap(([{ exerciseId }, user]) => this.exerciseTemplatesService.getExerciseTemplate(user?.uid as string, exerciseId).pipe(
            map((exercise: ExerciseTemplate) => getAuthenticatedUserExerciseTemplateDetailsRequestSuccess({exercise: exercise})),
            catchError(_ => {
                return of(getAuthenticatedUserExerciseTemplateDetailsRequestError({ exerciseId: exerciseId }))}
            )
        ))
    ))

    getAnonymousUserExerciseTemplateDetailsRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getAnonymousUserExerciseTemplateDetailsRequest),
        mergeMap(({ exerciseId }) => 
            this.store.select(getExerciseTemplateById(exerciseId)).pipe(
            take(1),
            map((exercise) => exercise ? 
                getAnonymousUserExerciseTemplateDetailsRequestSuccess({ exercise: exercise }) : 
                getAnonymousUserExerciseTemplateDetailsRequestError({ exerciseId: exerciseId }))
            )
        )
    ))

    getUserExerciseTemplateDetailsRequestError$ = createEffect(() => this.actions$.pipe(
        ofType(
            getAnonymousUserExerciseTemplateDetailsRequestError, 
            getAuthenticatedUserExerciseTemplateDetailsRequestError
        ),
        map(({ exerciseId }) => {
            this.router.navigate([AppRoutes.WorkoutExerciseTemplatesList])
            return showError({errorMessage: `${this.translateService.instant('apps.workout-exercises.errors.exerciseTemplateNotFound', 
            {
                exerciseTemplateId: exerciseId.toUpperCase(),
            }
            )}`})
        })
    ))

    //to-do
    getExerciseTemplateTrainingsDetailsRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getUserExerciseTemplateDetailsRequest),
        concatLatestFrom(() => this.store.select(getUser)),
        mergeMap(([{ exerciseId }, user]) => 
            iif(
                () => !!user,
                of(getAuthenticatedUserExerciseTemplateTrainingsDetailsRequest({ exerciseTemplateId: exerciseId})),
                of(getAnonymousUserExerciseTemplateTrainingsDetailsRequest({ exerciseTemplateId: exerciseId}))
            )
        )
    ))

    getAuthenticatedUserExerciseTemplateTrainingsDetailsRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getAuthenticatedUserExerciseTemplateTrainingsDetailsRequest),
        concatLatestFrom(() => this.store.select(getUser)),
        mergeMap(([{ exerciseTemplateId }, user]) => this.trainingService.getExerciseTemplateTrainings(user?.uid as string, exerciseTemplateId).pipe(
            map((trainings: Training[]) => getAuthenticatedUserExerciseTemplateTrainingsDetailsRequestSuccess({trainings: trainings})),
            catchError(_ => {
                this.router.navigate([AppRoutes.WorkoutExerciseTemplatesList])
                return of(getAuthenticatedUserExerciseTemplateTrainingsDetailsRequestError({ exerciseTemplateId: exerciseTemplateId }))}
            )
        ))
    ))
    
    getAnonymousUserExerciseTemplateTrainingsDetailsRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getAnonymousUserExerciseTemplateTrainingsDetailsRequest),
        mergeMap(({ exerciseTemplateId }) => 
            this.store.select(getTrainingsByExerciseTemplateId(exerciseTemplateId)).pipe(
            take(1),
            map((trainings) => trainings ? 
                getAnonymousUserExerciseTemplateTrainingsDetailsRequestSuccess({ trainings: trainings }) : 
                getAnonymousUserExerciseTemplateTrainingsDetailsRequestError({ exerciseTemplateId: exerciseTemplateId }))
            )
        )
    ))

    getUserExerciseTemplateTrainingsDetailsRequestError$ = createEffect(() => this.actions$.pipe(
        ofType(
            getAuthenticatedUserExerciseTemplateTrainingsDetailsRequestError, 
            getAnonymousUserExerciseTemplateTrainingsDetailsRequestError
        ),
        map(({ exerciseTemplateId }) => {
            return showError({errorMessage: `${this.translateService.instant('apps.workout-exercises.errors.exerciseTemplateTrainingsNotFound', 
            {
                exerciseTemplateId: exerciseTemplateId.toUpperCase(),
            }
            )}`})
        })
    ))
}