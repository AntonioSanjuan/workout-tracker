import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UiModule } from '@workout-tracker/ui';
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterModule } from '@angular/router';
import { DialogService } from '@workout-tracker/services/dialog';
import { LetDirective } from '@ngrx/component';
import { NgFor } from '@angular/common';
import { AppRoutes } from '@workout-tracker/models';
import { selectWorkoutTrainingDetailsState } from './state/workout-training.selectors';
import { ViewHeaderComponent } from '@workout-tracker/components';
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
    ViewHeaderComponent
  ],
  styleUrls: ['./workout-training.component.scss'],
  standalone: true
})
export class WorkoutTrainingComponent {
  private store: Store = inject(Store)
  private router: Router = inject(Router)
  private dialogService = inject(DialogService)

  public trainingDetails$ = this.store.select(selectWorkoutTrainingDetailsState)
  
  public appRoutes = AppRoutes

  public editTraining() {
    // this.dialogService.showDialog(EditWorkoutExerciseDetailsDialogComponent, true)
  }

  public newTrainingExercise() {
    this.dialogService.showDialog(AddWorkoutTrainingExerciseDialogComponent, true)

  }

  public openTrainingList() {
    this.router.navigate([AppRoutes.WorkoutTrainingsList])
  }
}
