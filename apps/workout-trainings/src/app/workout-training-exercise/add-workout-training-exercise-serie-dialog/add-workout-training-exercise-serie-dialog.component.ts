import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UiModule } from '@workout-tracker/ui';
import { TranslateModule } from '@ngx-translate/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddWorkoutTrainingExerciseSerieForm, getAddWorkoutTrainingExerciseSerieForm } from './add-workout-training-exercise-serie-dialog.form';
import { FormGroup } from '@angular/forms';
import { ExerciseType, TrainingExercise, TrainingExerciseSerie } from '@workout-tracker/models';
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
  private data: TrainingExercise = inject(MAT_DIALOG_DATA)
  private store: Store = inject(Store)

  protected readonly types = ExerciseType
  public form!: FormGroup<AddWorkoutTrainingExerciseSerieForm>;

  private weightChange = 1.25;
  private repetitionChange = 1;
  private speedChange = 0.5;
  private durationChange = 1;

  ngOnInit(): void {
    if(this.data) {
      const lastSerie: TrainingExerciseSerie | undefined = this.data?.series[this.data?.series?.length - 1]
      this.form = getAddWorkoutTrainingExerciseSerieForm(this.data.exerciseTemplate.type , lastSerie)
    }
  }

  public getExerciseType(): ExerciseType {
    return this.data?.exerciseTemplate.type
  }

  public createTrainingExerciseSerie() {
    if(this.form.valid) {
      const trainingExerciseSerie = {
        ...this.form.getRawValue(),
        creationDate: new Date()
      } as any
      this.store.dispatch(addUserTrainingExerciseSerieRequest({ trainingExerciseSerie: trainingExerciseSerie}))
      this.dialogRef.close()
    }
  }

  public substractWeight() {
    const currentWeightValue = this.form.value.data?.weight || 0
    this.form.patchValue({
      data: {
        weight:  ((currentWeightValue - this.weightChange) > 0) ? 
        currentWeightValue - this.weightChange:
        0
      }
    })
  }

  public addWeight() {
    const currentWeightValue = this.form.value.data?.weight || 0
    this.form.patchValue({
      data: {
        weight:  currentWeightValue + this.weightChange
      }
    })
  }

  public substractRepetition() {
    const currentRepetitionValue = this.form.value.data?.repetitions || 0
    this.form.patchValue({
      data: {
        repetitions: ((currentRepetitionValue - this.repetitionChange) > 0) ? 
        currentRepetitionValue - this.repetitionChange:
        0
      }
    })
  }

  public addRepetition() {
    const currentRepetitionValue = this.form.value.data?.repetitions || 0
    this.form.patchValue({
      data: {
        repetitions:  currentRepetitionValue + this.repetitionChange
      }
    })
  }

  public substractDuration() {
    const currentDurationValue = this.form.value.data?.duration || 0
    this.form.patchValue({
      data: {
        duration:  ((currentDurationValue - this.durationChange) > 0) ? 
        currentDurationValue - this.durationChange:
        0
      }
    })
  }

  public addDuration() {
    const currentDurationValue = this.form.value.data?.duration || 0
    this.form.patchValue({
      data: {
        duration: currentDurationValue + this.durationChange
      }
    })
  }

  public substractSpeed() {
    const currentDurationValue = this.form.value.data?.speed || 0
    this.form.patchValue({
      data: {
        speed: ((currentDurationValue - this.speedChange) > 0) ? 
        currentDurationValue - this.speedChange:
        0
      }
    })
  }

  public addSpeed() {
    const currentDurationValue = this.form.value.data?.speed || 0
    this.form.patchValue({
      data: {
        speed:  currentDurationValue + this.speedChange
      }
    })
  }
}
