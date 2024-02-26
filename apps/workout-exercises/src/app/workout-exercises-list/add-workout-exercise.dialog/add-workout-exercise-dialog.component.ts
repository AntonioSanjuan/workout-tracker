import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UiModule } from '@workout-tracker/ui';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AddWorkoutExerciseForm, getAddWorkoutExerciseForm } from './add-workout-exercise-dialog.form';
import { FormGroup } from '@angular/forms';
import { Exercise, ExerciseType } from '@workout-tracker/models';
import { ExerciseTypePillComponent } from '@workout-tracker/components';
import { addUserExerciseRequest } from '@workout-tracker/shared-store';

@Component({
  selector: 'workout-tracker-add-exercise-dialog',
  templateUrl: './add-workout-exercise-dialog.component.html',
  imports: [
    UiModule,
    TranslateModule,
    ExerciseTypePillComponent
  ],
  styleUrls: ['./add-workout-exercise-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true
})
export class AddWorkoutExerciseDialogComponent implements OnInit {
  private dialogRef: MatDialogRef<AddWorkoutExerciseDialogComponent> = inject(MatDialogRef<AddWorkoutExerciseDialogComponent>)
  private store: Store = inject(Store)

  private selectedExerciseTypes: ExerciseType[] = []

  public form!: FormGroup<AddWorkoutExerciseForm>
  public exerciseTypes = Object.values(ExerciseType) as ExerciseType[]

  ngOnInit(): void {
      this.form = getAddWorkoutExerciseForm()
  }

  public isSelectedExerciseType(exerciseType: ExerciseType) {
    return this.selectedExerciseTypes.includes(exerciseType)
  }

  public selectExerciseType(exerciseType: ExerciseType) {
    this.selectedExerciseTypes = this.selectedExerciseTypes.includes(exerciseType) ? 
      this.selectedExerciseTypes.filter((selectExerciseType) => selectExerciseType !== exerciseType):
      [...this.selectedExerciseTypes, exerciseType]
    this.form.patchValue({ types: [...this.selectedExerciseTypes]})
  }

  public createExercise() {
    if(this.form.valid) {
      const exercise = this.form.getRawValue() as Exercise
      this.store.dispatch(addUserExerciseRequest({ exercise: exercise}))
      this.dialogRef.close()
    }
  }


}
