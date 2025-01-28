import { Component, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UiModule } from '@workout-tracker/ui';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MuscleGroups, Training } from '@workout-tracker/models';
import { updateUserTrainingListRequest } from '@workout-tracker/shared-store';
import { WorkoutTrainingFormComponent } from '../shared/workout-training-form/workout-training-form.component';
import { selectWorkoutTraining } from '../../workout-training/state/workout-training.selectors';
import { LetDirective } from '@ngrx/component';

@Component({
  selector: 'workout-tracker-edit-training-dialog',
  templateUrl: './edit-workout-training-dialog.component.html',
  imports: [
    UiModule,
    TranslateModule,
    WorkoutTrainingFormComponent,
    LetDirective
  ],
  styleUrls: ['./edit-workout-training-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true
})
export class EditWorkoutTrainingDialogComponent {
  private dialogRef: MatDialogRef<EditWorkoutTrainingDialogComponent> = inject(MatDialogRef<EditWorkoutTrainingDialogComponent>)
  private store: Store = inject(Store)

  public training$ = this.store.select(selectWorkoutTraining)
  public muscleGroups = MuscleGroups

  @ViewChild(WorkoutTrainingFormComponent) workoutTrainingFormComponent?: WorkoutTrainingFormComponent;

  public editTraining(training: Training | undefined) {
    if (this.workoutTrainingFormComponent?.isFormValid()) {
      const editedTraining = {
        ...training,
        ...this.workoutTrainingFormComponent.getTraining(),
      } as Training
      this.store.dispatch(updateUserTrainingListRequest({ training: editedTraining }))
      this.dialogRef.close()
    }
  }

  public getStepperIndex(): number {
    return this.workoutTrainingFormComponent?.getStepperIndex() || 0
  }

  public nextStep() {
    this.workoutTrainingFormComponent?.nextStep()
  }
}
