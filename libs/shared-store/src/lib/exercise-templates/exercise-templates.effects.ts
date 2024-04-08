import { Injectable, inject } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { ExerciseTemplatesService } from '@workout-tracker/services/exercise-templates'
import { catchError, iif, map, of, switchMap, take } from "rxjs";
import { getUser } from "../user";
import firebase from 'firebase/compat/app';
import { getExerciseTemplatesList } from "./exercise-templates.selectors";
import { ExerciseTemplate } from "@workout-tracker/models";
import { addAnonymousUserExerciseTemplateRequest, addAnonymousUserExerciseTemplateRequestError, addAnonymousUserExerciseTemplateRequestSuccess, addAuthenticatedUserExerciseTemplateRequest, addAuthenticatedUserExerciseTemplateRequestError, addAuthenticatedUserExerciseTemplateRequestSuccess, addUserExerciseTemplateRequest, getAnonymousUserExerciseTemplatesRequest, getAnonymousUserExerciseTemplatesRequestError, getAnonymousUserExerciseTemplatesRequestSuccess, getAuthenticatedUserExerciseTemplatesRequest, getAuthenticatedUserExerciseTemplatesRequestError, getAuthenticatedUserExerciseTemplatesRequestSuccess, getUserExerciseTemplatesRequest } from "./exercise-templates.actions";
import { AppInit, loadedApp } from "../ui";

@Injectable()
export class ExerciseTemplatesEffects {
    private exerciseTemplatesService: ExerciseTemplatesService = inject(ExerciseTemplatesService)
    private store: Store = inject(Store)
    private actions$ = inject(Actions);

    getUserExerciseTemplatesRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getUserExerciseTemplatesRequest),
        concatLatestFrom(() => this.store.select(getUser)),
        switchMap(([_, user]) =>
            iif(
                () => !!user,
                of(getAuthenticatedUserExerciseTemplatesRequest()),
                of(getAnonymousUserExerciseTemplatesRequest())
            )
    )))
    
    getAuthenticatedUserExerciseTemplatesRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getAuthenticatedUserExerciseTemplatesRequest),
        concatLatestFrom(() => this.store.select(getUser)),
        switchMap(([_, user]) =>
            this.exerciseTemplatesService.getExerciseTemplates(user?.uid as string).pipe(
            map((exercises: ExerciseTemplate[]) => 
                getAuthenticatedUserExerciseTemplatesRequestSuccess({ exercises: exercises})
            ),
            catchError((err: firebase.FirebaseError) => of(getAuthenticatedUserExerciseTemplatesRequestError({ error: err })))
            )
        )
    ))

    getAnonymousUserExerciseTemplatesRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getAnonymousUserExerciseTemplatesRequest),
        switchMap(() =>
            this.store.select(getExerciseTemplatesList).pipe(
            take(1),
            map((exercises: ExerciseTemplate[]) => 
                getAnonymousUserExerciseTemplatesRequestSuccess({ exercises: exercises})
            ),
            catchError((err: firebase.FirebaseError) => of(getAnonymousUserExerciseTemplatesRequestError({ error: err })))
        )
        )
    ))

    getUserExercisesSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(
            getAuthenticatedUserExerciseTemplatesRequestSuccess,
            getAnonymousUserExerciseTemplatesRequestSuccess,
        ),
        switchMap(({ exercises }) =>
            of(loadedApp({initialized: AppInit.EXERCISES_TEMPLATES}))
        )
    ))

    addUserExerciseTemplateRequest$ = createEffect(() => this.actions$.pipe(
        ofType(addUserExerciseTemplateRequest),
        concatLatestFrom(() => this.store.select(getUser)),
        switchMap(([{ exercise }, user]) =>
        iif(
            () => !!user,
            of(addAuthenticatedUserExerciseTemplateRequest({ exercise: exercise})),
            of(addAnonymousUserExerciseTemplateRequest({ exercise: exercise}))
        )
        )
    ))

    addAuthenticatedUserExerciseTemplateRequest$ = createEffect(() => this.actions$.pipe(
        ofType(addAuthenticatedUserExerciseTemplateRequest),
        concatLatestFrom(() => this.store.select(getUser)),
        switchMap(([{ exercise }, user]) =>
                this.exerciseTemplatesService.setExerciseTemplate(user?.uid as string, exercise).pipe(
                map((exercise: ExerciseTemplate) => 
                addAuthenticatedUserExerciseTemplateRequestSuccess({ exercise: exercise})
                ),
                catchError((err: firebase.FirebaseError) => {
                    console.log("err", err)
                    return of(addAuthenticatedUserExerciseTemplateRequestError({ error: err}))
                }))
            )
        )
    )

    addAnonymousUserExerciseTemplateRequest$ = createEffect(() => this.actions$.pipe(
        ofType(addAnonymousUserExerciseTemplateRequest),
        concatLatestFrom(() => this.store.select(getExerciseTemplatesList)),
        switchMap(([{ exercise }, exerciseList]) =>
            of(exercise).pipe(
            take(1),
            map((exercise: ExerciseTemplate) => 
            {
                return addAnonymousUserExerciseTemplateRequestSuccess({ exercise: {...exercise, id: (exerciseList.length + 1).toString()}})
            }
            ),
            catchError((err: firebase.FirebaseError) => of(addAnonymousUserExerciseTemplateRequestError({ error: err })))
        )
        )
    ))
}