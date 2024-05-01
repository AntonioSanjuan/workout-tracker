import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Store } from "@ngrx/store";
import { TrainingExercise } from "@workout-tracker/models";
import { Observable, filter, of } from "rxjs";
import { getUserTrainingExerciseRequest } from "../../workout-training-exercise/state/workout-training-exercise.actions";
import { selectWorkoutTrainingExercise } from "../../workout-training-exercise/state/workout-training-exercise.selectors";

@Injectable({
    providedIn: 'root'
})
export class WorkoutTrainingExerciseResolver implements Resolve<any> {
    private store: Store = inject(Store)

    resolve(route: ActivatedRouteSnapshot): Observable<TrainingExercise|undefined> {
        const trainingId = route.paramMap.get('id');
        const trainingExerciseId = route.paramMap.get('exerciseId');

        if(trainingId && trainingExerciseId) {
            this.store.dispatch(getUserTrainingExerciseRequest({ trainingId: trainingId, trainingExerciseId: trainingExerciseId}))
            return this.store.select(selectWorkoutTrainingExercise).pipe(
                filter((trainingExercise: TrainingExercise | undefined) => !!trainingExercise)
            )
        }
        return of(undefined);

    }
}