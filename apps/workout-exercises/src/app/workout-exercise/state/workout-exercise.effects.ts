import { Injectable, inject } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, of, mergeMap, iif, take } from 'rxjs'
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ExerciseTemplatesService } from '@workout-tracker/services/exercise-templates';
import { Store } from '@ngrx/store';
import { getExerciseTemplateById, getUser, showError } from '@workout-tracker/shared-store';
import { AppRoutes, ExerciseTemplate } from '@workout-tracker/models';
import { getAnonymousUserExerciseDetailsRequest, getAnonymousUserExerciseDetailsRequestError, getAnonymousUserExerciseDetailsRequestSuccess, getAuthenticatedUserExerciseDetailsRequest, getAuthenticatedUserExerciseDetailsRequestError, getAuthenticatedUserExerciseDetailsRequestSuccess, getUserExerciseDetailsRequest } from './workout-exercise.actions';
@Injectable()
export class ExerciseEffects {
    private exercisesService: ExerciseTemplatesService = inject(ExerciseTemplatesService)
    private translateService: TranslateService = inject(TranslateService)
    private actions$: Actions = inject(Actions);
    private router: Router = inject(Router)
    private store: Store = inject(Store)

    getExerciseDetailsRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getUserExerciseDetailsRequest),
        concatLatestFrom(() => this.store.select(getUser)),
        mergeMap(([{ exerciseId }, user]) => 
            iif(
                () => !!user,
                of(getAuthenticatedUserExerciseDetailsRequest({ exerciseId: exerciseId})),
                of(getAnonymousUserExerciseDetailsRequest({ exerciseId: exerciseId}))
            )
        )
    ))
    getAuthenticatedUserExerciseDetailsRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getAuthenticatedUserExerciseDetailsRequest),
        concatLatestFrom(() => this.store.select(getUser)),
        mergeMap(([{ exerciseId }, user]) => this.exercisesService.getExerciseTemplate(user?.uid as string, exerciseId).pipe(
            map((exercise: ExerciseTemplate) => getAuthenticatedUserExerciseDetailsRequestSuccess({exercise: exercise})),
            catchError(_ => {
                this.router.navigate([AppRoutes.WorkoutExercisesList])
                return of(getAuthenticatedUserExerciseDetailsRequestError({ exerciseId: exerciseId }))}
            )
        ))
    ))

    getAnonymousUserExerciseDetailsRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getAnonymousUserExerciseDetailsRequest),
        mergeMap(({ exerciseId }) => 
            this.store.select(getExerciseTemplateById(exerciseId)).pipe(
            take(1),
            map((exercise) => exercise ? 
                getAnonymousUserExerciseDetailsRequestSuccess({ exercise: exercise }) : 
                getAnonymousUserExerciseDetailsRequestError({ exerciseId: exerciseId }))
            )
        )
    ))

    getExerciseDetailsRequestError$ = createEffect(() => this.actions$.pipe(
        ofType(
            getAnonymousUserExerciseDetailsRequestError, 
            getAuthenticatedUserExerciseDetailsRequestError
        ),
        map(({ exerciseId }) => {
            return showError({errorMessage: `${this.translateService.instant('apps.workout-exercises.errors.exerciseNotFound', 
            {
                exerciseId: exerciseId.toUpperCase(),
            }
            )}`})
        })
    ))
}