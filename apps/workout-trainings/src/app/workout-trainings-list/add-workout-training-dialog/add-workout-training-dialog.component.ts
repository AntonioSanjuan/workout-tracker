import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UiModule } from '@workout-tracker/ui';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AddWorkoutTrainingForm, getAddWorkoutTrainingForm } from './add-workout-training-dialog.form';
import { FormGroup } from '@angular/forms';
import { MuscleGroups, Training } from '@workout-tracker/models';
import { addUserTrainingListRequest } from '@workout-tracker/shared-store';
import { MusclesGroupsSelectorComponent } from '@workout-tracker/components';

@Component({
  selector: 'workout-tracker-add-training-dialog',
  templateUrl: './add-workout-training-dialog.component.html',
  imports: [
    UiModule,
    TranslateModule,
    MusclesGroupsSelectorComponent
  ],
  styleUrls: ['./add-workout-training-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true
})
export class AddWorkoutTrainingDialogComponent implements OnInit {
  private dialogRef: MatDialogRef<AddWorkoutTrainingDialogComponent> = inject(MatDialogRef<AddWorkoutTrainingDialogComponent>)
  private store: Store = inject(Store)

  public form!: FormGroup<AddWorkoutTrainingForm>
  public muscleGroups = MuscleGroups


  ngOnInit(): void {
      this.form = getAddWorkoutTrainingForm()
  }

  public createTraining() {
    if(this.form.valid) {
      const training = {
        ...this.form.getRawValue(), 
        creationDate: new Date(),
      } as Training
      this.store.dispatch(addUserTrainingListRequest({ training: training}))
      this.dialogRef.close()
    }
  }
}
