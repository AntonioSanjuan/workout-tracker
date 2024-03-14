import { Injectable, inject } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { ExercisesService } from '@workout-tracker/services/exercises'
import { catchError, iif, map, of, switchMap, take } from "rxjs";
import { getUser } from "../user";
import firebase from 'firebase/compat/app';
import { getExercisesList } from "./exercises.selectors";
import { Exercise } from "@workout-tracker/models";
import { addAnonymousUserExerciseRequest, addAnonymousUserExerciseRequestError, addAnonymousUserExerciseRequestSuccess, addAuthenticatedUserExerciseRequest, addAuthenticatedUserExerciseRequestError, addAuthenticatedUserExerciseRequestSuccess, addUserExerciseRequest, getAnonymousUserExercisesRequest, getAnonymousUserExercisesRequestError, getAnonymousUserExercisesRequestSuccess, getAuthenticatedUserExercisesRequest, getAuthenticatedUserExercisesRequestError, getAuthenticatedUserExercisesRequestSuccess, getUserExercisesRequest } from "./exercises.actions";
import { AppInit, loadedApp } from "../ui";

@Injectable()
export class ExercisesEffects {
private exercisesService: ExercisesService = inject(ExercisesService)
    private store: Store = inject(Store)
    private actions$ = inject(Actions);

    getUserExercisesRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getUserExercisesRequest),
        concatLatestFrom(() => this.store.select(getUser)),
        switchMap(([_, user]) =>
            iif(
                () => !!user,
                of(getAuthenticatedUserExercisesRequest()),
                of(getAnonymousUserExercisesRequest())
            )
    )))
    
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

    getAnonymousUserExercisesRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getAnonymousUserExercisesRequest),
        switchMap(() =>
            this.store.select(getExercisesList).pipe(
            take(1),
            map((exercises: Exercise[]) => 
                getAnonymousUserExercisesRequestSuccess({ exercises: exercises})
            ),
            catchError((err: firebase.FirebaseError) => of(getAnonymousUserExercisesRequestError({ error: err })))
        )
        )
    ))

    getUserExercisesSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(
            getAuthenticatedUserExercisesRequestSuccess,
            getAnonymousUserExercisesRequestSuccess,
        ),
        switchMap(({ exercises }) =>
            of(loadedApp({initialized: AppInit.EXERCISES}))
        )
    ))

    addUserExerciseRequest$ = createEffect(() => this.actions$.pipe(
        ofType(addUserExerciseRequest),
        concatLatestFrom(() => this.store.select(getUser)),
        switchMap(([{ exercise }, user]) =>
        iif(
            () => !!user,
            of(addAuthenticatedUserExerciseRequest({ exercise: exercise})),
            of(addAnonymousUserExerciseRequest({ exercise: exercise}))
        )
        )
    ))

    addAuthenticatedUserExerciseRequest$ = createEffect(() => this.actions$.pipe(
        ofType(addAuthenticatedUserExerciseRequest),
        concatLatestFrom(() => this.store.select(getUser)),
        switchMap(([{ exercise }, user]) =>
                this.exercisesService.setExercises(user?.uid as string, exercise).pipe(
                map((exercise: Exercise) => 
                addAuthenticatedUserExerciseRequestSuccess({ exercise: exercise})
                ),
                catchError((err: firebase.FirebaseError) => {
                    console.log("err", err)
                    return of(addAuthenticatedUserExerciseRequestError({ error: err}))
                }))
            )
        )
    )

    addAnonymousUserExerciseRequest$ = createEffect(() => this.actions$.pipe(
        ofType(addAnonymousUserExerciseRequest),
        concatLatestFrom(() => this.store.select(getExercisesList)),
        switchMap(([{ exercise }, exerciseList]) =>
            of(exercise).pipe(
            take(1),
            map((exercise: Exercise) => 
            {
                return addAnonymousUserExerciseRequestSuccess({ exercise: {...exercise, id: (exerciseList.length + 1).toString()}})
            }
            ),
            catchError((err: firebase.FirebaseError) => of(addAnonymousUserExerciseRequestError({ error: err })))
        )
        )
    ))
}