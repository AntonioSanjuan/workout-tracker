import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Store } from "@ngrx/store";
import { Exercise } from "@workout-tracker/models";
import { AppInit, getExerciseById, getIsAppLoaded } from "@workout-tracker/shared-store";
import { Observable, filter, of, take, tap } from "rxjs";
import { getUserExerciseDetailsRequest } from "../../workout-exercise/state/workout-exercise.actions";

@Injectable({
    providedIn: 'root'
})
export class WorkoutExerciseResolver implements Resolve<any> {
    private store: Store = inject(Store)

    resolve(route: ActivatedRouteSnapshot): Observable<Exercise|undefined> {
        const exerciseId = route.paramMap.get('id');

        if(exerciseId) {
            this.store.select(getIsAppLoaded(AppInit.EXERCISES)).pipe(
                filter((isLoaded: boolean) => isLoaded),
                take(1),
                tap(() => {
                    this.store.dispatch(getUserExerciseDetailsRequest({ exerciseId: exerciseId}))
                })
            ).subscribe()
            return this.store.select(getExerciseById(exerciseId))
        }
        return of(undefined);

    }
}