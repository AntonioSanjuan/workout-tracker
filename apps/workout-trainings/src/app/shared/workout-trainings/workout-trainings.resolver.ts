import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Store } from "@ngrx/store";
import { Exercise, Training } from "@workout-tracker/models";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class WorkoutTrainingsResolver implements Resolve<any> {
    private store: Store = inject(Store)

    resolve(route: ActivatedRouteSnapshot): Observable<Training[]> {
        return of([])
        // return this.store.select(getTrainingsList)
    }
}