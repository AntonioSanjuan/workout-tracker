import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UiModule } from '@workout-tracker/ui';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AddWorkoutTrainingExerciseForm, getAddWorkoutTrainingExerciseForm } from './add-workout-training-exercise-dialog.form';
import { FormGroup } from '@angular/forms';
import { ExerciseEquipment, ExerciseTemplate, MusclesInvolved, TrainingExercise, TrainingExerciseSerie } from '@workout-tracker/models';
import { EquipmentSelectorComponent, ExerciseTemplateCardComponent, MusclesGroupsSelectorComponent, MusclesSelectorComponent } from '@workout-tracker/components';
import { addUserTrainingExerciseRequest } from '../state/workout-training.actions';
import { getExerciseTemplatesListFiltered, setExerciseTemplateListEquipmentQueryFilter, setExerciseTemplateListMuscleInvolvedQueryFilter } from '@workout-tracker/shared-store';
import { selectWorkoutTraining } from '../state/workout-training.selectors';

@Component({
  selector: 'workout-tracker-add-training-exercise-dialog',
  templateUrl: './add-workout-training-exercise-dialog.component.html',
  imports: [
    UiModule,
    TranslateModule,
    MusclesGroupsSelectorComponent,
    EquipmentSelectorComponent,
    ExerciseTemplateCardComponent,
    MusclesSelectorComponent
  ],
  styleUrls: ['./add-workout-training-exercise-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true
})
export class AddWorkoutTrainingExerciseDialogComponent implements OnInit {
  private dialogRef: MatDialogRef<AddWorkoutTrainingExerciseDialogComponent> = inject(MatDialogRef<AddWorkoutTrainingExerciseDialogComponent>)
  private store: Store = inject(Store)

  public form!: FormGroup<AddWorkoutTrainingExerciseForm>
  public filteredExerciseTemplates$ = this.store.select(getExerciseTemplatesListFiltered)
  public workoutTraining$ = this.store.select(selectWorkoutTraining);

  ngOnInit(): void {
    this.form = getAddWorkoutTrainingExerciseForm()
  }

  public createTrainingExercise() {
    if (this.form.valid) {
      const trainingExercise = {
        ...this.form.getRawValue(),
        creationDate: new Date(),
        series: [] as TrainingExerciseSerie[]
      } as TrainingExercise
      this.store.dispatch(addUserTrainingExerciseRequest({ trainingExercise: trainingExercise }))
      this.dialogRef.close()
    }
  }

  public filterByMuscleInvolved(muscleInvolved: MusclesInvolved): void {
    this.store.dispatch(setExerciseTemplateListMuscleInvolvedQueryFilter({
      muscleInvolved: muscleInvolved
    }))
  }

  public filterByEquipment(equipment: ExerciseEquipment): void {
    this.store.dispatch(setExerciseTemplateListEquipmentQueryFilter({
      equipment: equipment
    }))
  }


  public setExerciseTemplate(exerciseTemplate: ExerciseTemplate) {
    this.form.setValue({
      exerciseTemplate: this.form.value.exerciseTemplate === exerciseTemplate ? null : exerciseTemplate
    })
  }

  public isSelected(exerciseTemplate: ExerciseTemplate) {
    return this.form.value.exerciseTemplate === exerciseTemplate
  }

}
