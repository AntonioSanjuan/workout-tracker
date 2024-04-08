import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Store } from "@ngrx/store";
import { ExerciseTemplate } from "@workout-tracker/models";
import { getExerciseTemplatesList, getUserExerciseTemplatesRequest } from "@workout-tracker/shared-store";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class WorkoutExercisesListResolver implements Resolve<any> {
    private store: Store = inject(Store)

    resolve(route: ActivatedRouteSnapshot): Observable<ExerciseTemplate[]> {
        this.store.dispatch(getUserExerciseTemplatesRequest())
        return this.store.select(getExerciseTemplatesList)
    }
}