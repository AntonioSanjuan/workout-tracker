import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Store } from "@ngrx/store";
import { Exercise } from "@workout-tracker/models";
import { AppInit, getExerciseById, getIsAppLoaded, getIsUILoadedApp } from "@workout-tracker/shared-store";
import { Observable, filter, of, take, tap } from "rxjs";
import { getUserExerciseRequest } from "../../workout-exercise-details/state/workout-exercise.actions";

@Injectable({
    providedIn: 'root'
})
export class WorkoutExerciseDetailsResolver implements Resolve<any> {
    private store: Store = inject(Store)

    resolve(route: ActivatedRouteSnapshot): Observable<Exercise|undefined> {
        const exerciseId = route.paramMap.get('id');

        if(exerciseId) {
            this.store.select(getIsAppLoaded(AppInit.EXERCISES)).pipe(
                filter((isLoaded: boolean) => isLoaded),
                take(1),
                tap(() => {
                    this.store.dispatch(getUserExerciseRequest({ exerciseId: exerciseId}))
                })
            ).subscribe()
            return this.store.select(getExerciseById(exerciseId))
        }
        return of(undefined);

    }
}