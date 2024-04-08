import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Store } from "@ngrx/store";
import { ExerciseTemplate } from "@workout-tracker/models";
import { getExerciseTemplateById } from "@workout-tracker/shared-store";
import { Observable, of } from "rxjs";
import { getUserExerciseDetailsRequest } from "../../workout-exercise/state/workout-exercise.actions";

@Injectable({
    providedIn: 'root'
})
export class WorkoutExerciseResolver implements Resolve<any> {
    private store: Store = inject(Store)

    resolve(route: ActivatedRouteSnapshot): Observable<ExerciseTemplate|undefined> {
        const exerciseId = route.paramMap.get('id');

        if(exerciseId) {
            this.store.dispatch(getUserExerciseDetailsRequest({ exerciseId: exerciseId}))
            return this.store.select(getExerciseTemplateById(exerciseId))
        }
        return of(undefined);

    }
}