import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Store } from "@ngrx/store";
import { Exercise } from "@workout-tracker/models";
import { getExerciseById } from "@workout-tracker/shared-store";
import { Observable, of } from "rxjs";
import { getUserExerciseDetailsRequest } from "../../workout-exercise-details/state/workout-exercise-details.actions";

@Injectable({
    providedIn: 'root'
})
export class WorkoutExerciseDetailsResolver implements Resolve<any> {
    private store: Store = inject(Store)

    resolve(route: ActivatedRouteSnapshot): Observable<Exercise|undefined> {
        const exerciseId = route.paramMap.get('id');

        if(exerciseId) {
            this.store.dispatch(getUserExerciseDetailsRequest({ exerciseId: exerciseId}))

            return this.store.select(getExerciseById(exerciseId))
        }
        return of(undefined);

    }
}