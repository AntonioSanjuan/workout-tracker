import { Injectable, inject } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { ExercisesService } from '@workout-tracker/services/exercises'
import { catchError, map, of, switchMap } from "rxjs";
import { getUser } from "../user";
import firebase from 'firebase/compat/app';
import { getExercisesList } from "./exercises.selectors";
import { Exercise } from "@workout-tracker/models";
import { addUserExerciseRequest, addUserExerciseRequestError, addUserExerciseRequestSuccess, getAnonymousUserExercisesRequest, getAnonymousUserExercisesRequestSuccess, getAuthenticatedUserExercisesRequest, getAuthenticatedUserExercisesRequestError, getAuthenticatedUserExercisesRequestSuccess } from "./exercises.actions";

@Injectable()
export class ExercisesEffects {
    private exercisesService: ExercisesService = inject(ExercisesService)
    private store: Store = inject(Store)
    private actions$ = inject(Actions);

    getAuthenticatedUserExercisesRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getAuthenticatedUserExercisesRequest),
        concatLatestFrom(() => this.store.select(getUser)),
        switchMap(([_, user]) =>
            this.exercisesService.getExercises(user?.uid as string).pipe(
            map((exercises: Exercise[]) => 
                getAuthenticatedUserExercisesRequestSuccess({ exercises: exercises})
            ),
            catchError((err: firebase.FirebaseError) => of(getAuthenticatedUserExercisesRequestError({ error: err })))
            )
        )
    ))

    addUserExerciseRequest$ = createEffect(() => this.actions$.pipe(
        ofType(addUserExerciseRequest),
        concatLatestFrom(() => this.store.select(getUser)),
        switchMap(([{ exercise }, user]) =>
            (user ?
                this.exercisesService.setExercises(user.uid, exercise):
                of(exercise)
            ).pipe(
                map((exercise: Exercise) => 
                    addUserExerciseRequestSuccess({ exercise: exercise})
                ),
                catchError((err: firebase.FirebaseError) => of(addUserExerciseRequestError({ error: err})))
            )
        )
    ))

    getAnonymousUserExercisesRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getAnonymousUserExercisesRequest),
        switchMap(() =>
            this.store.select(getExercisesList).pipe(
            map((exercises: Exercise[]) => 
                getAnonymousUserExercisesRequestSuccess({ exercises: exercises})
            ),
        )
        )
    ))
}