import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Store } from "@ngrx/store";
import { ExerciseTemplate } from "@workout-tracker/models";
import { Observable, filter, of } from "rxjs";
import { getUserExerciseTemplateDetailsRequest } from "../../workout-exercise-template/state/workout-exercise-template.actions";
import { selectWorkoutExerciseTemplateDetails } from "../../workout-exercise-template/state/workout-exercise-template.selectors";

@Injectable({
    providedIn: 'root'
})
export class WorkoutExerciseTemplateResolver implements Resolve<any> {
    private store: Store = inject(Store)

    resolve(route: ActivatedRouteSnapshot): Observable<ExerciseTemplate|undefined> {
        const exerciseId = route.paramMap.get('id');

        if(exerciseId) {
            this.store.dispatch(getUserExerciseTemplateDetailsRequest({ exerciseId: exerciseId}))
            return this.store.select(selectWorkoutExerciseTemplateDetails).pipe(
                filter((exerciseTempalte: ExerciseTemplate | undefined) => !!exerciseTempalte)
            )
        }
        return of(undefined);

    }
}