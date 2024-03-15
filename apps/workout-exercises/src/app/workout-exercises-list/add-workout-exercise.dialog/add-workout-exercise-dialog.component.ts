import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UiModule } from '@workout-tracker/ui';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AddWorkoutExerciseForm, getAddWorkoutExerciseForm } from './add-workout-exercise-dialog.form';
import { FormGroup } from '@angular/forms';
import { Exercise, MusclesInvolved, muscleInvolvedByGroups } from '@workout-tracker/models';
import { addUserExerciseRequest, showError } from '@workout-tracker/shared-store';
import { MusclesSelectorComponent } from '@workout-tracker/components';

@Component({
  selector: 'workout-tracker-add-exercise-dialog',
  templateUrl: './add-workout-exercise-dialog.component.html',
  imports: [
    UiModule,
    TranslateModule,
    MusclesSelectorComponent
  ],
  styleUrls: ['./add-workout-exercise-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true
})
export class AddWorkoutExerciseDialogComponent implements OnInit, OnDestroy {
  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;

  private dialogRef: MatDialogRef<AddWorkoutExerciseDialogComponent> = inject(MatDialogRef<AddWorkoutExerciseDialogComponent>)
  private store: Store = inject(Store)
  private translateService: TranslateService = inject(TranslateService)

  public form!: FormGroup<AddWorkoutExerciseForm>
  public muscles = Object.values(MusclesInvolved) as MusclesInvolved[]
  public musclesByGroup = muscleInvolvedByGroups;

  public cameraOpened: boolean = false
  public photo?: string

  ngOnInit(): void {
      this.form = getAddWorkoutExerciseForm()
  }

  ngOnDestroy(): void {
      this.switchCameraStatus(false)
  }

  public createExercise() {
    if(this.form.valid) {
      const exercise = {
        ...this.form.getRawValue(), 
        creationDate: new Date(),
        image: this.photo
      } as Exercise
      this.store.dispatch(addUserExerciseRequest({ exercise: exercise}))
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
