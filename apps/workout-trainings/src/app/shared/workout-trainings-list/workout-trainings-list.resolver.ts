import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Store } from "@ngrx/store";
import { Training } from "@workout-tracker/models";
import { AppInit, getIsAppLoaded, getTrainingsList, getUserTrainingsRequest } from "@workout-tracker/shared-store";
import { Observable, filter, mergeMap, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class WorkoutTrainingsListResolver implements Resolve<any> {
    private store: Store = inject(Store)

    resolve(route: ActivatedRouteSnapshot): Observable<Training[]> {
        this.store.dispatch(getUserTrainingsRequest())
        return this.store.select(getIsAppLoaded(AppInit.TRAININGS)).pipe(
            filter((isLoaded: boolean) => isLoaded),
            mergeMap(() => this.store.select(getTrainingsList))
        )    
    }
}