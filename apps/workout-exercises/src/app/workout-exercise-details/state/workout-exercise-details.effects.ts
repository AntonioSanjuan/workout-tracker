import { Injectable, inject } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, of, mergeMap, iif } from 'rxjs'
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ExercisesService } from '@workout-tracker/services/exercises';
import { Store } from '@ngrx/store';
import { getExerciseById, getUser, showError } from '@workout-tracker/shared-store';
import { AppRoutes, Exercise } from '@workout-tracker/models';
import { getAnonymousUserExerciseDetailsRequest, getAnonymousUserExerciseDetailsRequestError, getAnonymousUserExerciseDetailsRequestSuccess, getAuthenticatedUserExerciseDetailsRequest, getAuthenticatedUserExerciseDetailsRequestError, getAuthenticatedUserExerciseDetailsRequestSuccess, getUserExerciseDetailsRequest } from './workout-exercise-details.actions';
@Injectable()
export class ExerciseDetailsEffects {
    private exercisesService: ExercisesService = inject(ExercisesService)
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
        mergeMap(([{ exerciseId }, user]) => this.exercisesService.getExercise(user?.uid as string, exerciseId).pipe(
            map((exercise: Exercise) => getAuthenticatedUserExerciseDetailsRequestSuccess({exercise: exercise})),
            catchError(_ => {
                this.router.navigate([AppRoutes.WorkoutExercisesList])
                return of(getAuthenticatedUserExerciseDetailsRequestError({ exerciseId: exerciseId }))}
            )
        ))
    ))

    getAnonymousUserExerciseDetailsRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getAnonymousUserExerciseDetailsRequest),
        mergeMap(({ exerciseId }) => this.store.select(getExerciseById(exerciseId)).pipe(
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