import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UiModule } from '@workout-tracker/ui';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AddWorkoutExerciseForm, getAddWorkoutExerciseForm } from './add-workout-exercise-dialog.form';
import { FormGroup } from '@angular/forms';
import { Exercise, MusclesInvolved } from '@workout-tracker/models';
import { addUserExerciseRequest } from '@workout-tracker/shared-store';

@Component({
  selector: 'workout-tracker-add-exercise-dialog',
  templateUrl: './add-workout-exercise-dialog.component.html',
  imports: [
    UiModule,
    TranslateModule,
  ],
  styleUrls: ['./add-workout-exercise-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true
})
export class AddWorkoutExerciseDialogComponent implements OnInit {
  private dialogRef: MatDialogRef<AddWorkoutExerciseDialogComponent> = inject(MatDialogRef<AddWorkoutExerciseDialogComponent>)
  private store: Store = inject(Store)
  public form!: FormGroup<AddWorkoutExerciseForm>
  public muscles = Object.values(MusclesInvolved) as MusclesInvolved[]

  ngOnInit(): void {
      this.form = getAddWorkoutExerciseForm()
  }

  public createExercise() {
    if(this.form.valid) {
      const exercise = {
        ...this.form.getRawValue(), 
        creationDate: new Date()
      } as Exercise
      this.store.dispatch(addUserExerciseRequest({ exercise: exercise}))
      this.dialogRef.close()
    }
  }


}
