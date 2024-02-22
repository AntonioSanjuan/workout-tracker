import { Injectable, inject } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { ExercisesService } from '@workout-tracker/services/exercises'
import { getExercisesRequest, getExercisesRequestError, getExercisesRequestSuccess, updateExercisesQueryFilters } from "./exercises.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { getUser } from "../user";
import firebase from 'firebase/compat/app';
import { getExercisesList } from "./exercises.selectors";
import { Exercise } from "@workout-tracker/models";

@Injectable()
export class ExercisesEffects {
    private exercisesService: ExercisesService = inject(ExercisesService)
    private store: Store = inject(Store)
    private actions$ = inject(Actions);

    getExercisesRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getExercisesRequest),
        concatLatestFrom(() => this.store.select(getUser)),
        switchMap(([_, user]) =>
            (user ?
                this.exercisesService.getExercises(user.uid):
                this.store.select(getExercisesList)
            ).pipe(
                map((exercises: Exercise[]) => 
                    getExercisesRequestSuccess({ exercises: exercises})
                ),
                catchError((err: firebase.FirebaseError) => of(getExercisesRequestError({ error: err })))
            )
        )
    ))
}