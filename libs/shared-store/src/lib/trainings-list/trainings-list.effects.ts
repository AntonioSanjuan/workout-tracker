import { Injectable, inject } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { EMPTY, catchError, filter, iif, map, of, switchMap, take, tap } from "rxjs";
import { getUser } from "../user";
import firebase from 'firebase/compat/app';
import { AppRoutes, Training } from "@workout-tracker/models";
import { AppInit, loadedApp } from "../ui";
import { TrainingsService } from "@workout-tracker/services/trainings"
import { updateAnonymousUserTrainingListRequestError, updateAnonymousUserTrainingListRequestSuccess, updateAuthenticatedUserTrainingListRequestError, updateAuthenticatedUserTrainingListRequestSuccess, getAnonymousUserTrainingsListRequest, getAnonymousUserTrainingsListRequestError, getAnonymousUserTrainingsListRequestSuccess, getAuthenticatedUserTrainingsListRequest, getAuthenticatedUserTrainingsListRequestError, getAuthenticatedUserTrainingsListRequestSuccess, getUserTrainingsListRequest, setTrainingListQueryFilter, addUserTrainingListRequest, addAuthenticatedUserTrainingListRequest, addAnonymousUserTrainingListRequest, addAuthenticatedUserTrainingListRequestSuccess, addAuthenticatedUserTrainingListRequestError, addAnonymousUserTrainingListRequestSuccess, addAnonymousUserTrainingListRequestError, clearTrainingListQueryFilter } from "./trainings-list.actions";
import { updateAnonymousUserTrainingListRequest, updateAuthenticatedUserTrainingListRequest, updateUserTrainingListRequest, getTrainingListOngoing, getTrainingsList, getTrainingsListPagination, getTrainingsListQuery } from ".";
import { Router } from "@angular/router";

@Injectable()
export class TrainingsListEffects {
    private trainingsService: TrainingsService = inject(TrainingsService)
    private store: Store = inject(Store)
    private router: Router = inject(Router)
    private actions$ = inject(Actions);

    getUserTrainingsListRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getUserTrainingsListRequest, setTrainingListQueryFilter, clearTrainingListQueryFilter),
        concatLatestFrom(() => this.store.select(getUser)),
        switchMap(([_, user]) =>
            iif(
                () => !!user,
                of(getAuthenticatedUserTrainingsListRequest()),
                of(getAnonymousUserTrainingsListRequest())
            )
    )))
    
    getAuthenticatedUserTrainingsListRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getAuthenticatedUserTrainingsListRequest),
        concatLatestFrom(() => [this.store.select(getUser), this.store.select(getTrainingsListQuery)]),
        switchMap(([_, user, query]) =>
            this.trainingsService.getTrainings(user?.uid as string, query).pipe(
            map((trainings: Training[]) => 
                getAuthenticatedUserTrainingsListRequestSuccess({ trainings: trainings})
            ),
            catchError((err: firebase.FirebaseError) => of(getAuthenticatedUserTrainingsListRequestError({ error: err })))
            )
        )
    ))

    getAnonymousUserTrainingsListRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getAnonymousUserTrainingsListRequest),
        switchMap(() =>
            this.store.select(getTrainingsList).pipe(
            take(1),
            map((trainings: Training[]) => 
                getAnonymousUserTrainingsListRequestSuccess({ trainings: trainings})
            ),
            catchError((err: firebase.FirebaseError) => of(getAnonymousUserTrainingsListRequestError({ error: err })))
        )
        )
    ))

    getUserTrainingsListSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(
            getAuthenticatedUserTrainingsListRequestSuccess,
            getAnonymousUserTrainingsListRequestSuccess,
        ),
        switchMap(({ trainings }) =>
            of(loadedApp({initialized: AppInit.TRAININGS}))
        )
    ))

    finishUserTrainingListOnGoingRequest$ = createEffect(() => this.actions$.pipe(
        ofType(addUserTrainingListRequest),
        concatLatestFrom(() => [this.store.select(getTrainingListOngoing)]),
        filter(([_, trainingOngoing]) => !!trainingOngoing),
        switchMap(([_, trainingOngoing]) =>
                of(updateAuthenticatedUserTrainingListRequest({ training: { ...trainingOngoing as Training, finishDate: new Date()}})),
            )
        )
    )

    addUserTrainingListRequest$ = createEffect(() => this.actions$.pipe(
        ofType(addUserTrainingListRequest),
        concatLatestFrom(() => this.store.select(getUser)),
        switchMap(([{ training }, user]) =>
            iif(
                () => !!user,
                of(addAuthenticatedUserTrainingListRequest({ training: training})),
                of(addAnonymousUserTrainingListRequest({ training: training}))
            )
        )
    ))

    addAuthenticatedUserTrainingListRequest$ = createEffect(() => this.actions$.pipe(
        ofType(addAuthenticatedUserTrainingListRequest),
        concatLatestFrom(() => this.store.select(getUser)),
        switchMap(([{ training }, user]) =>
                this.trainingsService.setTraining(user?.uid as string, training).pipe(
                map((training: Training) => 
                    addAuthenticatedUserTrainingListRequestSuccess({ training: training})
                ),
                catchError((err: firebase.FirebaseError) => {
                    console.log("err", err)
                    return of(addAuthenticatedUserTrainingListRequestError({ error: err}))
                }))
            )
        )
    )

    addAnonymousUserTrainingListRequest$ = createEffect(() => this.actions$.pipe(
        ofType(addAnonymousUserTrainingListRequest),
        concatLatestFrom(() => this.store.select(getTrainingsList)),
        switchMap(([{ training }, trainingList]) =>
            of(training).pipe(
            take(1),
            map((training: Training) => 
                addAnonymousUserTrainingListRequestSuccess({ training: {...training, id: (trainingList.length + 1).toString()}})
            ),
            catchError((err: firebase.FirebaseError) => of(addAnonymousUserTrainingListRequestError({ error: err })))
        )
        )
    ))

    addUserTrainingListRequestSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(addAuthenticatedUserTrainingListRequestSuccess, addAnonymousUserTrainingListRequestSuccess),
        tap(({ training }) => 
            this.router.navigate([`${AppRoutes.WorkoutTrainingsList}/${training.id}`])
        )
    ), { dispatch: false})


    updateUserTrainingListRequest$ = createEffect(() => this.actions$.pipe(
        ofType(updateUserTrainingListRequest),
        concatLatestFrom(() => this.store.select(getUser)),
        switchMap(([{ training }, user]) =>
            iif(
                () => !!user,
                of(updateAuthenticatedUserTrainingListRequest({ training: training})),
                of(updateAnonymousUserTrainingListRequest({ training: training}))
            )
        )
    ))

    updateAuthenticatedUserTrainingListRequest$ = createEffect(() => this.actions$.pipe(
        ofType(updateAuthenticatedUserTrainingListRequest),
        concatLatestFrom(() => this.store.select(getUser)),
        switchMap(([{ training }, user]) =>
                this.trainingsService.updateTraining(user?.uid as string, training).pipe(
                map((training: Training) => 
                    updateAuthenticatedUserTrainingListRequestSuccess({ training: training})
                ),
                catchError((err: firebase.FirebaseError) => {
                    console.log("err", err)
                    return of(updateAuthenticatedUserTrainingListRequestError({ error: err}))
                }))
            )
        )
    )

    updateAnonymousUserTrainingListRequest$ = createEffect(() => this.actions$.pipe(
        ofType(updateAnonymousUserTrainingListRequest),
        switchMap(({ training }) =>
            of(training).pipe(
            take(1),
            map((training: Training) => 
                updateAnonymousUserTrainingListRequestSuccess({ training: training })
            ),
            catchError((err: firebase.FirebaseError) => of(updateAnonymousUserTrainingListRequestError({ error: err })))
        )
        )
    ))
}