import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UiModule } from '@workout-tracker/ui';
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterModule } from '@angular/router';
import { DialogService } from '@workout-tracker/services/dialog';
import { LetDirective } from '@ngrx/component';
import { NgFor } from '@angular/common';
import { AppRoutes } from '@workout-tracker/models';
import { TrainingExerciseCardComponent, ViewHeaderComponent } from '@workout-tracker/components';
import { selectWorkoutTrainingDetailsState } from '../workout-training/state/workout-training.selectors';

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
    TrainingExerciseCardComponent
  ],
  styleUrls: ['./workout-training-exercise.component.scss'],
  standalone: true
})
export class WorkoutTrainingExerciseComponent {
  private store: Store = inject(Store)
  private router: Router = inject(Router)
  private dialogService = inject(DialogService)

  public trainingDetails$ = this.store.select(selectWorkoutTrainingDetailsState)
  
  public appRoutes = AppRoutes

  public editTrainingSerie() {
    // this.dialogService.showDialog(EditWorkoutExerciseDetailsDialogComponent, true)
  }

  public newTrainingExerciseSerie() {
    // this.dialogService.showDialog(AddWorkoutTrainingExerciseSerieDialogComponent, true)

  }
}
