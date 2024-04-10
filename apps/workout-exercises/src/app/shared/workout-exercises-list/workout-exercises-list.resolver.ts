import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Store } from "@ngrx/store";
import { ExerciseTemplate } from "@workout-tracker/models";
import { AppInit, getExerciseTemplatesList, getIsAppLoaded, getUserExerciseTemplatesListRequest } from "@workout-tracker/shared-store";
import { Observable, filter, mergeMap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class WorkoutExercisesListResolver implements Resolve<any> {
    private store: Store = inject(Store)

    resolve(route: ActivatedRouteSnapshot): Observable<ExerciseTemplate[]> {
        this.store.dispatch(getUserExerciseTemplatesListRequest())
        return this.store.select(getIsAppLoaded(AppInit.EXERCISES_TEMPLATES)).pipe(
            filter((isLoaded: boolean) => isLoaded),
            mergeMap(() => this.store.select(getExerciseTemplatesList))
        )
    }
}