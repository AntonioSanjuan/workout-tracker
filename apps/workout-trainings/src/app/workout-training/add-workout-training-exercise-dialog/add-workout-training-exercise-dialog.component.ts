import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UiModule } from '@workout-tracker/ui';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AddWorkoutTrainingExerciseForm, getAddWorkoutTrainingExerciseForm } from './add-workout-training-exercise-dialog.form';
import { FormGroup } from '@angular/forms';
import { ExerciseTemplate, MuscleGroups, MusclesInvolved, TrainingExercise, TrainingExerciseSerie, muscleInvolvedByGroups } from '@workout-tracker/models';
import { ExerciseTemplateCardComponent, MusclesGroupsSelectorComponent, MusclesSelectorComponent } from '@workout-tracker/components';
import { addUserTrainingExerciseRequest } from '../state/workout-training.actions';
import { getExerciseTemplatesListFiltered, getExerciseTemplatesListFilters, getUserExerciseTemplatesListRequest, setExerciseTemplateListMuscleInvolvedQueryFilter } from '@workout-tracker/shared-store';

@Component({
  selector: 'workout-tracker-add-training-exercise-dialog',
  templateUrl: './add-workout-training-exercise-dialog.component.html',
  imports: [
    UiModule,
    TranslateModule,
    MusclesGroupsSelectorComponent,
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
  public filteredExerciseTemplates$ =  this.store.select(getExerciseTemplatesListFiltered)

  ngOnInit(): void {
      this.form = getAddWorkoutTrainingExerciseForm()
      this.store.dispatch(getUserExerciseTemplatesListRequest())
  }

  public createTrainingExercise() {
    if(this.form.valid) {
      const trainingExercise = {
        ...this.form.getRawValue(), 
        series: [] as TrainingExerciseSerie[]
      } as TrainingExercise
      this.store.dispatch(addUserTrainingExerciseRequest({ trainingExercise: trainingExercise}))
      this.dialogRef.close()
    }
  }

  public filterByMuscleInvolved(muscleInvolved: MusclesInvolved): void {
    this.store.dispatch(setExerciseTemplateListMuscleInvolvedQueryFilter({ 
      muscleInvolved: muscleInvolved
    }))
  }

  public setExerciseTemplate(exerciseTemplate: ExerciseTemplate) {
    this.form.setValue({
      exerciseTemplate: exerciseTemplate
    })
  }

}
