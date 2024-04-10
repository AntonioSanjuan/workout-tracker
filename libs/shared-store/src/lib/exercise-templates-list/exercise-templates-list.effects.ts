import { Injectable, inject } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { ExerciseTemplatesService } from '@workout-tracker/services/exercise-templates'
import { catchError, iif, map, of, switchMap, take } from "rxjs";
import { getUser } from "../user";
import firebase from 'firebase/compat/app';
import { getExerciseTemplatesList } from "./exercise-templates-list.selectors";
import { ExerciseTemplate } from "@workout-tracker/models";
import { addAnonymousUserExerciseTemplateListRequest, addAnonymousUserExerciseTemplateListRequestError, addAnonymousUserExerciseTemplateListRequestSuccess, addAuthenticatedUserExerciseTemplateListRequest, addAuthenticatedUserExerciseTemplateListRequestError, addAuthenticatedUserExerciseTemplateListRequestSuccess, addUserExerciseTemplateListRequest, getAnonymousUserExerciseTemplatesListRequest, getAnonymousUserExerciseTemplatesListRequestError, getAnonymousUserExerciseTemplatesListRequestSuccess, getAuthenticatedUserExerciseTemplatesListRequest, getAuthenticatedUserExerciseTemplatesListRequestError, getAuthenticatedUserExerciseTemplatesListRequestSuccess, getUserExerciseTemplatesListRequest } from "./exercise-templates-list.actions";
import { AppInit, loadedApp } from "../ui";

@Injectable()
export class ExerciseTemplatesListEffects {
    private exerciseTemplatesService: ExerciseTemplatesService = inject(ExerciseTemplatesService)
    private store: Store = inject(Store)
    private actions$ = inject(Actions);

    getUserExerciseTemplatesListRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getUserExerciseTemplatesListRequest),
        concatLatestFrom(() => this.store.select(getUser)),
        switchMap(([_, user]) =>
            iif(
                () => !!user,
                of(getAuthenticatedUserExerciseTemplatesListRequest()),
                of(getAnonymousUserExerciseTemplatesListRequest())
            )
    )))
    
    getAuthenticatedUserExerciseTemplatesListRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getAuthenticatedUserExerciseTemplatesListRequest),
        concatLatestFrom(() => this.store.select(getUser)),
        switchMap(([_, user]) =>
            this.exerciseTemplatesService.getExerciseTemplates(user?.uid as string).pipe(
            map((exercises: ExerciseTemplate[]) => 
                getAuthenticatedUserExerciseTemplatesListRequestSuccess({ exercises: exercises})
            ),
            catchError((err: firebase.FirebaseError) => of(getAuthenticatedUserExerciseTemplatesListRequestError({ error: err })))
            )
        )
    ))

    getAnonymousUserExerciseTemplatesListRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getAnonymousUserExerciseTemplatesListRequest),
        switchMap(() =>
            this.store.select(getExerciseTemplatesList).pipe(
            take(1),
            map((exercises: ExerciseTemplate[]) => 
                getAnonymousUserExerciseTemplatesListRequestSuccess({ exercises: exercises})
            ),
            catchError((err: firebase.FirebaseError) => of(getAnonymousUserExerciseTemplatesListRequestError({ error: err })))
        )
        )
    ))

    getUserExerciseTemplatesListSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(
            getAuthenticatedUserExerciseTemplatesListRequestSuccess,
            getAnonymousUserExerciseTemplatesListRequestSuccess,
        ),
        switchMap(({ exercises }) =>
            of(loadedApp({initialized: AppInit.EXERCISES_TEMPLATES}))
        )
    ))

    addUserExerciseTemplateListRequest$ = createEffect(() => this.actions$.pipe(
        ofType(addUserExerciseTemplateListRequest),
        concatLatestFrom(() => this.store.select(getUser)),
        switchMap(([{ exercise }, user]) =>
        iif(
            () => !!user,
            of(addAuthenticatedUserExerciseTemplateListRequest({ exercise: exercise})),
            of(addAnonymousUserExerciseTemplateListRequest({ exercise: exercise}))
        )
        )
    ))

    addAuthenticatedUserExerciseTemplateListRequest$ = createEffect(() => this.actions$.pipe(
        ofType(addAuthenticatedUserExerciseTemplateListRequest),
        concatLatestFrom(() => this.store.select(getUser)),
        switchMap(([{ exercise }, user]) =>
                this.exerciseTemplatesService.setExerciseTemplate(user?.uid as string, exercise).pipe(
                map((exercise: ExerciseTemplate) => 
                addAuthenticatedUserExerciseTemplateListRequestSuccess({ exercise: exercise})
                ),
                catchError((err: firebase.FirebaseError) => {
                    console.log("err", err)
                    return of(addAuthenticatedUserExerciseTemplateListRequestError({ error: err}))
                }))
            )
        )
    )

    addAnonymousUserExerciseTemplateListRequest$ = createEffect(() => this.actions$.pipe(
        ofType(addAnonymousUserExerciseTemplateListRequest),
        concatLatestFrom(() => this.store.select(getExerciseTemplatesList)),
        switchMap(([{ exercise }, exerciseList]) =>
            of(exercise).pipe(
            take(1),
            map((exercise: ExerciseTemplate) => 
            {
                return addAnonymousUserExerciseTemplateListRequestSuccess({ exercise: {...exercise, id: (exerciseList.length + 1).toString()}})
            }
            ),
            catchError((err: firebase.FirebaseError) => of(addAnonymousUserExerciseTemplateListRequestError({ error: err })))
        )
        )
    ))
}