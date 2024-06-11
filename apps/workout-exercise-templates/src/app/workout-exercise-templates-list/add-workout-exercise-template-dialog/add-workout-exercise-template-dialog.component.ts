import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UiModule } from '@workout-tracker/ui';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AddWorkoutExerciseTemplateForm, getAddWorkoutExerciseTemplateForm } from './add-workout-exercise-template-dialog.form';
import { FormGroup } from '@angular/forms';
import { ExerciseTemplate, ExerciseType, MusclesInvolved, muscleInvolvedByGroups } from '@workout-tracker/models';
import { addUserExerciseTemplateListRequest, showError } from '@workout-tracker/shared-store';
import { MusclesSelectorComponent } from '@workout-tracker/components';

@Component({
  selector: 'workout-tracker-add-exercise-template-dialog',
  templateUrl: './add-workout-exercise-template-dialog.component.html',
  imports: [
    UiModule,
    TranslateModule,
    MusclesSelectorComponent
  ],
  styleUrls: ['./add-workout-exercise-template-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true
})
export class AddWorkoutExerciseTemplateDialogComponent implements OnInit, OnDestroy {
  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;

  private dialogRef: MatDialogRef<AddWorkoutExerciseTemplateDialogComponent> = inject(MatDialogRef<AddWorkoutExerciseTemplateDialogComponent>)
  private store: Store = inject(Store)
  private translateService: TranslateService = inject(TranslateService)

  public form!: FormGroup<AddWorkoutExerciseTemplateForm>
  public muscles = Object.values(MusclesInvolved) as MusclesInvolved[]
  public musclesByGroup = muscleInvolvedByGroups;
  public exerciseUnits = ExerciseType

  public cameraOpened: boolean = false
  public photo?: string

  ngOnInit(): void {
      this.form = getAddWorkoutExerciseTemplateForm()
  }

  ngOnDestroy(): void {
      this.switchCameraStatus(false)
  }

  public createExerciseTemplate() {
    if(this.form.valid) {
      const exercise = {
        ...this.form.getRawValue(), 
        creationDate: new Date(),
        image: this.photo
      } as ExerciseTemplate
      this.store.dispatch(addUserExerciseTemplateListRequest({ exercise: exercise}))
      this.dialogRef.close()
    }
  }

  public switchCameraStatus(newStatus: boolean) {
    this.cameraOpened = newStatus

    if(this.cameraOpened) {
      navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        this.video.nativeElement.srcObject = stream;
        this.video.nativeElement.play();
      })
      .catch((err) => {
        console.error(`An error occurred: ${err}`);
        this.store.dispatch(showError({ errorMessage: this.translateService.instant('apps.workout-exercises.list.addExercise.step.image.errors.cameraError')}))
      });
    }
  }
  public takePhoto() {
    const canvas = document.createElement("canvas");
    canvas.width = this.video.nativeElement.clientWidth * 1;
    canvas.height = this.video.nativeElement.clientHeight * 1;
    canvas.getContext('2d')?.drawImage(this.video.nativeElement, 0, 0, canvas.width, canvas.height);

    this.photo = canvas.toDataURL()
    canvas.remove()
  }

  public clearPhoto() {
    this.photo = undefined
    this.switchCameraStatus(true)
  }


}
