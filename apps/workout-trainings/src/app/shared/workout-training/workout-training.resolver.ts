import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Store } from "@ngrx/store";
import { Training } from "@workout-tracker/models";
import { Observable, of } from "rxjs";
import { getUserTrainingDetailsRequest } from "../../workout-training/state/workout-training.actions";
import { selectWorkoutTrainingDetails } from "../../workout-training/state/workout-training.selectors";

@Injectable({
    providedIn: 'root'
})
export class WorkoutTrainingResolver implements Resolve<any> {
    private store: Store = inject(Store)

    resolve(route: ActivatedRouteSnapshot): Observable<Training|undefined> {
        const trainingId = route.paramMap.get('id');

        if(trainingId) {
            this.store.dispatch(getUserTrainingDetailsRequest({ trainingId: trainingId}))
            return this.store.select(selectWorkoutTrainingDetails)
        }
        return of(undefined);

    }
}