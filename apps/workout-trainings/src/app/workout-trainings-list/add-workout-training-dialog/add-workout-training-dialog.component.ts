import { Component, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UiModule } from '@workout-tracker/ui';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MuscleGroups, Training } from '@workout-tracker/models';
import { addUserTrainingListRequest } from '@workout-tracker/shared-store';
import { MusclesGroupsSelectorComponent } from '@workout-tracker/components';
import { WorkoutTrainingFormComponent } from '../shared/workout-training-form/workout-training-form.component';

@Component({
  selector: 'workout-tracker-add-training-dialog',
  templateUrl: './add-workout-training-dialog.component.html',
  imports: [
    UiModule,
    TranslateModule,
    WorkoutTrainingFormComponent,
    MusclesGroupsSelectorComponent
  ],
  styleUrls: ['./add-workout-training-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true
})
export class AddWorkoutTrainingDialogComponent {
  private dialogRef: MatDialogRef<AddWorkoutTrainingDialogComponent> = inject(MatDialogRef<AddWorkoutTrainingDialogComponent>)
  private store: Store = inject(Store)

  public muscleGroups = MuscleGroups

  @ViewChild(WorkoutTrainingFormComponent) workoutTrainingFormComponent?: WorkoutTrainingFormComponent;

  public createTraining() {
    if(this.workoutTrainingFormComponent?.isFormValid()) {
      const training = {
        ...this.workoutTrainingFormComponent.getTraining(), 
        creationDate: new Date(),
      } as Training
      this.store.dispatch(addUserTrainingListRequest({ training: training}))
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
