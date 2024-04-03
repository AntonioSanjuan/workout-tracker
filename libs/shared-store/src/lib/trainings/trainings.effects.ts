import { Injectable, inject } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { EMPTY, catchError, filter, iif, map, of, switchMap, take } from "rxjs";
import { getUser } from "../user";
import firebase from 'firebase/compat/app';
import { Training } from "@workout-tracker/models";
import { AppInit, loadedApp } from "../ui";
import { TrainingsService } from "@workout-tracker/services/trainings"
import { updateAnonymousUserTrainingRequestError, updateAnonymousUserTrainingRequestSuccess, updateAuthenticatedUserTrainingRequestError, updateAuthenticatedUserTrainingRequestSuccess, getAnonymousUserTrainingsRequest, getAnonymousUserTrainingsRequestError, getAnonymousUserTrainingsRequestSuccess, getAuthenticatedUserTrainingsRequest, getAuthenticatedUserTrainingsRequestError, getAuthenticatedUserTrainingsRequestSuccess, getUserTrainingsRequest, setTrainingQueryFilter, addUserTrainingRequest, addAuthenticatedUserTrainingRequest, addAnonymousUserTrainingRequest, addAuthenticatedUserTrainingRequestSuccess, addAuthenticatedUserTrainingRequestError, addAnonymousUserTrainingRequestSuccess, addAnonymousUserTrainingRequestError } from "./trainings.actions";
import { updateAnonymousUserTrainingRequest, updateAuthenticatedUserTrainingRequest, updateUserTrainingRequest, getTrainingOngoing, getTrainingsList, getTrainingsPagination, getTrainingsQuery } from "../trainings";
import { getExercisesList } from "../exercises";

@Injectable()
export class TrainingsEffects {
    private trainingsService: TrainingsService = inject(TrainingsService)
    private store: Store = inject(Store)
    private actions$ = inject(Actions);

    getUserTrainingsRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getUserTrainingsRequest,setTrainingQueryFilter),
        concatLatestFrom(() => this.store.select(getUser)),
        switchMap(([_, user]) =>
            iif(
                () => !!user,
                of(getAuthenticatedUserTrainingsRequest()),
                of(getAnonymousUserTrainingsRequest())
            )
    )))
    
    getAuthenticatedUserTrainingsRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getAuthenticatedUserTrainingsRequest),
        concatLatestFrom(() => [this.store.select(getUser), this.store.select(getTrainingsQuery)]),
        switchMap(([_, user, query]) =>
            this.trainingsService.getTrainings(user?.uid as string, query).pipe(
            map((trainings: Training[]) => 
                getAuthenticatedUserTrainingsRequestSuccess({ trainings: trainings})
            ),
            catchError((err: firebase.FirebaseError) => of(getAuthenticatedUserTrainingsRequestError({ error: err })))
            )
        )
    ))

    getAnonymousUserTrainingsRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getAnonymousUserTrainingsRequest),
        switchMap(() =>
            this.store.select(getTrainingsList).pipe(
            take(1),
            map((trainings: Training[]) => 
                getAnonymousUserTrainingsRequestSuccess({ trainings: trainings})
            ),
            catchError((err: firebase.FirebaseError) => of(getAnonymousUserTrainingsRequestError({ error: err })))
        )
        )
    ))

    getUserTrainingsSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(
            getAuthenticatedUserTrainingsRequestSuccess,
            getAnonymousUserTrainingsRequestSuccess,
        ),
        switchMap(({ trainings }) =>
            of(loadedApp({initialized: AppInit.TRAININGS}))
        )
    ))

    finishUserTrainingOnGoingRequest$ = createEffect(() => this.actions$.pipe(
        ofType(addUserTrainingRequest),
        concatLatestFrom(() => [this.store.select(getTrainingOngoing)]),
        filter(([_, trainingOngoing]) => !!trainingOngoing),
        switchMap(([_, trainingOngoing]) =>
                of(updateAuthenticatedUserTrainingRequest({ training: { ...trainingOngoing as Training, finishDate: new Date()}})),
            )
        )
    )

    addUserTrainingRequest$ = createEffect(() => this.actions$.pipe(
        ofType(addUserTrainingRequest),
        concatLatestFrom(() => this.store.select(getUser)),
        switchMap(([{ training }, user]) =>
            iif(
                () => !!user,
                of(addAuthenticatedUserTrainingRequest({ training: training})),
                of(addAnonymousUserTrainingRequest({ training: training}))
            )
        )
    ))

    addAuthenticatedUserTrainingRequest$ = createEffect(() => this.actions$.pipe(
        ofType(addAuthenticatedUserTrainingRequest),
        concatLatestFrom(() => this.store.select(getUser)),
        switchMap(([{ training }, user]) =>
                this.trainingsService.setTraining(user?.uid as string, training).pipe(
                map((training: Training) => 
                    addAuthenticatedUserTrainingRequestSuccess({ training: training})
                ),
                catchError((err: firebase.FirebaseError) => {
                    console.log("err", err)
                    return of(addAuthenticatedUserTrainingRequestError({ error: err}))
                }))
            )
        )
    )

    addAnonymousUserTrainingRequest$ = createEffect(() => this.actions$.pipe(
        ofType(addAnonymousUserTrainingRequest),
        concatLatestFrom(() => this.store.select(getTrainingsList)),
        switchMap(([{ training }, trainingList]) =>
            of(training).pipe(
            take(1),
            map((training: Training) => 
                addAnonymousUserTrainingRequestSuccess({ training: {...training, id: (trainingList.length + 1).toString()}})
            ),
            catchError((err: firebase.FirebaseError) => of(addAnonymousUserTrainingRequestError({ error: err })))
        )
        )
    ))


    updateUserTrainingRequest$ = createEffect(() => this.actions$.pipe(
        ofType(updateUserTrainingRequest),
        concatLatestFrom(() => this.store.select(getUser)),
        switchMap(([{ training }, user]) =>
            iif(
                () => !!user,
                of(updateAuthenticatedUserTrainingRequest({ training: training})),
                of(updateAnonymousUserTrainingRequest({ training: training}))
            )
        )
    ))

    updateAuthenticatedUserTrainingRequest$ = createEffect(() => this.actions$.pipe(
        ofType(updateAuthenticatedUserTrainingRequest),
        concatLatestFrom(() => this.store.select(getUser)),
        switchMap(([{ training }, user]) =>
                this.trainingsService.updateTraining(user?.uid as string, training).pipe(
                map((training: Training) => 
                    updateAuthenticatedUserTrainingRequestSuccess({ training: training})
                ),
                catchError((err: firebase.FirebaseError) => {
                    console.log("err", err)
                    return of(updateAuthenticatedUserTrainingRequestError({ error: err}))
                }))
            )
        )
    )

    updateAnonymousUserTrainingRequest$ = createEffect(() => this.actions$.pipe(
        ofType(updateAnonymousUserTrainingRequest),
        switchMap(({ training }) =>
            of(training).pipe(
            take(1),
            map((training: Training) => 
                updateAnonymousUserTrainingRequestSuccess({ training: training })
            ),
            catchError((err: firebase.FirebaseError) => of(updateAnonymousUserTrainingRequestError({ error: err })))
        )
        )
    ))
}