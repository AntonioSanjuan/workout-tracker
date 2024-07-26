import { Component, ViewEncapsulation, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UiModule } from '@workout-tracker/ui';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ExerciseTemplateCardComponent, MusclesGroupsSelectorComponent, MusclesSelectorComponent } from '@workout-tracker/components';
import { copyUserTrainingListRequest } from '@workout-tracker/shared-store';
import { selectWorkoutTraining } from '../state/workout-training.selectors';
import { Training } from '@workout-tracker/models';

@Component({
  selector: 'workout-tracker-copy-workout-training-dialog',
  templateUrl: './copy-workout-training-dialog.component.html',
  imports: [
    UiModule,
    TranslateModule,
    MusclesSelectorComponent
  ],
  styleUrls: ['./copy-workout-training-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true
})
export class CopyWorkoutTrainingDialogComponent {
  private dialogRef: MatDialogRef<CopyWorkoutTrainingDialogComponent> = inject(MatDialogRef<CopyWorkoutTrainingDialogComponent>)
  private store: Store = inject(Store)

  public training$ =  this.store.select(selectWorkoutTraining)

  public copyTraining(training: Training) {
    this.store.dispatch(copyUserTrainingListRequest({ training: training }))
  }
}
