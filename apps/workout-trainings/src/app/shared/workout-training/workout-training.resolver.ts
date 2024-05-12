import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Store } from "@ngrx/store";
import { ExerciseTemplate, Training } from "@workout-tracker/models";
import { Observable, filter, forkJoin, map, mergeMap, of, tap } from "rxjs";
import { getUserTrainingRequest } from "../../workout-training/state/workout-training.actions";
import { selectWorkoutTraining } from "../../workout-training/state/workout-training.selectors";
import { AppInit, getExerciseTemplatesList, getIsAppLoaded, getUserExerciseTemplatesListRequest } from "@workout-tracker/shared-store";

@Injectable({
    providedIn: 'root'
})
export class WorkoutTrainingResolver implements Resolve<any> {
    private store: Store = inject(Store)

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        const trainingId = route.paramMap.get('id');

        if(trainingId) {
            this.store.dispatch(getUserTrainingRequest({ trainingId: trainingId}))
            this.store.dispatch(getUserExerciseTemplatesListRequest())

            return this.store.select(selectWorkoutTraining).pipe(
                filter((training: Training | undefined) => !!training)
            )
        } else {
            return of(undefined);
        }

    }
}