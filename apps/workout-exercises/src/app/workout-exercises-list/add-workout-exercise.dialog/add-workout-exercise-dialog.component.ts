import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { MuscleGroupPillDirective, MuscleInvolvedGroupPipe, UiModule } from '@workout-tracker/ui';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AddWorkoutExerciseForm, getAddWorkoutExerciseForm } from './add-workout-exercise-dialog.form';
import { FormGroup } from '@angular/forms';
import { Exercise, MusclesInvolved, muscleInvolvedByGroups } from '@workout-tracker/models';
import { addUserExerciseRequest } from '@workout-tracker/shared-store';
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
export class AddWorkoutExerciseDialogComponent implements OnInit {
  @ViewChild('video') video!: HTMLVideoElement;

  private dialogRef: MatDialogRef<AddWorkoutExerciseDialogComponent> = inject(MatDialogRef<AddWorkoutExerciseDialogComponent>)
  private store: Store = inject(Store)

  public form!: FormGroup<AddWorkoutExerciseForm>
  public muscles = Object.values(MusclesInvolved) as MusclesInvolved[]
  public musclesByGroup = muscleInvolvedByGroups;

  public cameraOpened: boolean = false
  public photo?: string

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

  public switchCameraStatus() {
    this.cameraOpened = !this.cameraOpened

    if(this.cameraOpened) {
      navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        this.video.srcObject = stream;
        this.video.play();
      })
      .catch((err) => {
        console.error(`An error occurred: ${err}`);
      });
    }
  }
  public takePhoto() {
    const canvas = document.createElement("canvas");
    canvas.width = this.video.clientWidth * 1;
    canvas.height = this.video.clientHeight * 1;
    canvas.getContext('2d')?.drawImage(this.video, 0, 0, canvas.width, canvas.height);

    this.photo = canvas.toDataURL()
    canvas.remove()
  }

  public clearPhoto() {

  }


}
