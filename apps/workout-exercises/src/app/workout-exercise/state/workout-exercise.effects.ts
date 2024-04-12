import { Injectable, inject } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, of, mergeMap, iif, take } from 'rxjs'
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ExerciseTemplatesService } from '@workout-tracker/services/exercise-templates';
import { Store } from '@ngrx/store';
import { getExerciseTemplateById, getUser, showError } from '@workout-tracker/shared-store';
import { AppRoutes, ExerciseTemplate } from '@workout-tracker/models';
import { getAnonymousUserExerciseTemplateDetailsRequest, getAnonymousUserExerciseTemplateDetailsRequestError, getAnonymousUserExerciseTemplateDetailsRequestSuccess, getAuthenticatedUserExerciseTemplateDetailsRequest, getAuthenticatedUserExerciseTemplateDetailsRequestError, getAuthenticatedUserExerciseTemplateDetailsRequestSuccess, getUserExerciseTemplateDetailsRequest } from './workout-exercise.actions';
@Injectable()
export class ExerciseEffects {
    private exercisesService: ExerciseTemplatesService = inject(ExerciseTemplatesService)
    private translateService: TranslateService = inject(TranslateService)
    private actions$: Actions = inject(Actions);
    private router: Router = inject(Router)
    private store: Store = inject(Store)

    getExerciseDetailsRequest$ = createEffect(() => this.actions$.pipe(
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

    getAuthenticatedUserExerciseDetailsRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getAuthenticatedUserExerciseTemplateDetailsRequest),
        concatLatestFrom(() => this.store.select(getUser)),
        mergeMap(([{ exerciseId }, user]) => this.exercisesService.getExerciseTemplate(user?.uid as string, exerciseId).pipe(
            map((exercise: ExerciseTemplate) => getAuthenticatedUserExerciseTemplateDetailsRequestSuccess({exercise: exercise})),
            catchError(_ => {
                this.router.navigate([AppRoutes.WorkoutExercisesList])
                return of(getAuthenticatedUserExerciseTemplateDetailsRequestError({ exerciseId: exerciseId }))}
            )
        ))
    ))

    getAnonymousUserExerciseDetailsRequest$ = createEffect(() => this.actions$.pipe(
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

    getExerciseDetailsRequestError$ = createEffect(() => this.actions$.pipe(
        ofType(
            getAnonymousUserExerciseTemplateDetailsRequestError, 
            getAuthenticatedUserExerciseTemplateDetailsRequestError
        ),
        map(({ exerciseId }) => {
            return showError({errorMessage: `${this.translateService.instant('apps.workout-exercises.errors.exerciseNotFound', 
            {
                exerciseId: exerciseId.toUpperCase(),
            }
            )}`})
        })
    ))

    //to-do
    getExerciseTrainingsDetailsRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getUserExerciseTemplateDetailsRequest),
        concatLatestFrom(() => this.store.select(getUser)),
        mergeMap(([{ exerciseId }, user]) => 
            iif(
                () => !!user,
                of(getAuthenticatedUserExerciseTrainingsDetailsRequest({ exerciseId: exerciseId})),
                of(getAnonymousUserExerciseTrainingsDetailsRequest({ exerciseId: exerciseId}))
            )
        )
    ))
    
    // getAuthenticatedUserExerciseTrainingsDetailsRequest$ = createEffect(() => this.actions$.pipe(
    //     ofType(getAuthenticatedUserExerciseTrainingsDetailsRequest),
    //     concatLatestFrom(() => this.store.select(getUser)),
    //     mergeMap(([{ exerciseId }, user]) => this.exercisesService.getExerciseTemplate(user?.uid as string, exerciseId).pipe(
    //         map((exercise: ExerciseTemplate) => getAuthenticatedUserExerciseDetailsRequestSuccess({exercise: exercise})),
    //         catchError(_ => {
    //             this.router.navigate([AppRoutes.WorkoutExercisesList])
    //             return of(getAuthenticatedUserExerciseTrainingsDetailsRequestError({ exerciseId: exerciseId }))}
    //         )
    //     ))
    // ))

    // getAnonymousUserExerciseTrainingsDetailsRequest$ = createEffect(() => this.actions$.pipe(
    //     ofType(getAnonymousUserExerciseTrainingsDetailsRequest),
    //     mergeMap(({ exerciseId }) => 
    //         this.store.select(getExerciseTemplateById(exerciseId)).pipe(
    //         take(1),
    //         map((exercise) => exercise ? 
    //             getAnonymousUserExerciseTrainingsDetailsRequestSuccess({ exercise: exercise }) : 
    //             getAnonymousUserExerciseTrainingsDetailsRequestError({ exerciseId: exerciseId }))
    //         )
    //     )
    // ))

    // getExerciseTrainingsDetailsRequestError$ = createEffect(() => this.actions$.pipe(
    //     ofType(
    //         getAuthenticatedUserExerciseTrainingsDetailsRequestError, 
    //         getAnonymousUserExerciseTrainingsDetailsRequestError
    //     ),
    //     map(({ exerciseId }) => {
    //         return showError({errorMessage: `${this.translateService.instant('apps.workout-exercises.errors.exerciseNotFound', 
    //         {
    //             exerciseId: exerciseId.toUpperCase(),
    //         }
    //         )}`})
    //     })
    // ))
}