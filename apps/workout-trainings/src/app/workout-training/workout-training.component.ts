import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UiModule } from '@workout-tracker/ui';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DialogService } from '@workout-tracker/services/dialog';
import { LetDirective } from '@ngrx/component';
import { NgFor } from '@angular/common';
import { AppRoutes, Training, TrainingExercise } from '@workout-tracker/models';
import { selectWorkoutTraining } from './state/workout-training.selectors';
import { TrainingExerciseCardComponent, ViewHeaderComponent } from '@workout-tracker/components';
import { AddWorkoutTrainingExerciseDialogComponent } from './add-workout-training-exercise-dialog/add-workout-training-exercise-dialog.component';

@Component({
  selector: 'workout-tracker-training',
  templateUrl: './workout-training.component.html',
  imports: [
    UiModule,
    LetDirective,
    TranslateModule,
    NgFor,
    RouterModule,
    ViewHeaderComponent,
    TrainingExerciseCardComponent
  ],
  styleUrls: ['./workout-training.component.scss'],
  standalone: true
})
export class WorkoutTrainingComponent {
  private store: Store = inject(Store)
  private router: Router = inject(Router)
  private dialogService = inject(DialogService)
  private route = inject(ActivatedRoute)

  public training$ = this.store.select(selectWorkoutTraining)
  
  public appRoutes = AppRoutes

  public editTraining() {
    // this.dialogService.showDialog(EditWorkoutExerciseDetailsDialogComponent, true)
  }

  public newTrainingExercise() {
    this.dialogService.showDialog(AddWorkoutTrainingExerciseDialogComponent, true)

  }

  public openTrainingExercise(training: Training, trainingExercise: TrainingExercise) {
    this.router.navigate([`/trainings/${training.id}/exercise/${trainingExercise.id}`])
  }
}
