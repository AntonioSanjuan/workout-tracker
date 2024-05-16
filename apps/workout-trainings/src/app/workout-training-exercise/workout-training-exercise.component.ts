import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UiModule } from '@workout-tracker/ui';
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterModule } from '@angular/router';
import { DialogService } from '@workout-tracker/services/dialog';
import { LetDirective } from '@ngrx/component';
import { NgFor } from '@angular/common';
import { AppRoutes, TrainingExerciseSerie } from '@workout-tracker/models';
import { SeriesTableComponent, ViewHeaderComponent } from '@workout-tracker/components';
import { selectWorkoutTrainingExercise, selectWorkoutTrainingExerciseParentId } from './state/workout-training-exercise.selectors';
import { AddWorkoutTrainingExerciseSerieDialogComponent } from './add-workout-training-exercise-serie-dialog/add-workout-training-exercise-serie-dialog.component';
import { deleteUserTrainingExerciseSerieRequest } from './state/workout-training-exercise.actions';

@Component({
  selector: 'workout-tracker-training-exercise',
  templateUrl: './workout-training-exercise.component.html',
  imports: [
    UiModule,
    LetDirective,
    TranslateModule,
    NgFor,
    RouterModule,
    ViewHeaderComponent,
    SeriesTableComponent
  ],
  styleUrls: ['./workout-training-exercise.component.scss'],
  standalone: true
})
export class WorkoutTrainingExerciseComponent {
  private store: Store = inject(Store)
  private router: Router = inject(Router)
  private dialogService = inject(DialogService)

  public trainingExerciseParentId$ = this.store.select(selectWorkoutTrainingExerciseParentId)
  public trainingExercise$ = this.store.select(selectWorkoutTrainingExercise)
  
  public appRoutes = AppRoutes

  public editTrainingSerie() {
    // this.dialogService.showDialog(EditWorkoutExerciseDetailsDialogComponent, true)
  }

  public newTrainingExerciseSerie() {
    this.dialogService.showDialog(AddWorkoutTrainingExerciseSerieDialogComponent, true)
  }

  public deleteTrainingExerciseSerie(serie: TrainingExerciseSerie) {
    this.store.dispatch(deleteUserTrainingExerciseSerieRequest({ trainingExerciseSerie: serie }))
  }
  public editTrainingExerciseSerie(serie: TrainingExerciseSerie) {}
}
