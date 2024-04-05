import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Store } from "@ngrx/store";
import { ExerciseTemplate } from "@workout-tracker/models";
import { getExerciseTemplatesList, getUserExerciseTemplatesRequest } from "@workout-tracker/shared-store";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class WorkoutExercisesListResolver implements Resolve<any> {
    private store: Store = inject(Store)

    resolve(route: ActivatedRouteSnapshot): Observable<ExerciseTemplate[]> {
        return this.store.select(getExerciseTemplatesList)
    }
}