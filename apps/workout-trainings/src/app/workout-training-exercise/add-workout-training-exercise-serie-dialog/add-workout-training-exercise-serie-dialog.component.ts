import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UiModule } from '@workout-tracker/ui';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AddWorkoutTrainingExerciseSerieForm, getAddWorkoutTrainingExerciseSerieForm } from './add-workout-training-exercise-serie-dialog.form';
import { FormGroup } from '@angular/forms';
import { TrainingExerciseSerie } from '@workout-tracker/models';
import { ExerciseTemplateCardComponent, MusclesGroupsSelectorComponent, MusclesSelectorComponent } from '@workout-tracker/components';
import { addUserTrainingExerciseSerieRequest } from '../state/workout-training-exercise.actions';

@Component({
  selector: 'workout-tracker-add-training-exercise-serie-dialog',
  templateUrl: './add-workout-training-exercise-serie-dialog.component.html',
  imports: [
    UiModule,
    TranslateModule,
    MusclesGroupsSelectorComponent,
    ExerciseTemplateCardComponent,
    MusclesSelectorComponent
  ],
  styleUrls: ['./add-workout-training-exercise-serie-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true
})
export class AddWorkoutTrainingExerciseSerieDialogComponent implements OnInit {
  private dialogRef: MatDialogRef<AddWorkoutTrainingExerciseSerieDialogComponent> = inject(MatDialogRef<AddWorkoutTrainingExerciseSerieDialogComponent>)
  private store: Store = inject(Store)

  public form!: FormGroup<AddWorkoutTrainingExerciseSerieForm>

  ngOnInit(): void {
      this.form = getAddWorkoutTrainingExerciseSerieForm()
  }

  public createTrainingExerciseSerie() {
    if(this.form.valid) {
      const trainingExerciseSerie = {
        ...this.form.getRawValue(),
      } as TrainingExerciseSerie
      this.store.dispatch(addUserTrainingExerciseSerieRequest({ trainingExerciseSerie: trainingExerciseSerie}))
      this.dialogRef.close()
    }
  }
}
