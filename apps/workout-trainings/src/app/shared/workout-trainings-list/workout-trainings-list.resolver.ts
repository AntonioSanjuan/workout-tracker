import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Store } from "@ngrx/store";
import { Training } from "@workout-tracker/models";
import { getTrainingsList, getUserTrainingsRequest } from "@workout-tracker/shared-store";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class WorkoutTrainingsListResolver implements Resolve<any> {
    private store: Store = inject(Store)

    resolve(route: ActivatedRouteSnapshot): Observable<Training[]> {
        this.store.dispatch(getUserTrainingsRequest())
        return this.store.select(getTrainingsList)
    }
}