import { Component, ViewEncapsulation, inject, OnInit } from '@angular/core';
import { UiModule } from '@workout-tracker/ui';
import { TranslateModule } from '@ngx-translate/core';
import { Training } from '@workout-tracker/models';
import { updateUserTrainingListRequest } from '@workout-tracker/shared-store';
import { WorkoutTrainingFormComponent } from '../shared/workout-training-form/workout-training-form.component';
import { BaseWorkoutTrainingDialogComponent } from '../shared/base-workout-training-dialog.component';
import { selectWorkoutTraining } from '../../workout-training/state/workout-training.selectors';
import { LetDirective } from '@ngrx/component';

@Component({
  selector: 'workout-tracker-edit-training-dialog',
  templateUrl: '../shared/base-workout-training-dialog.component.html',
  imports: [
    UiModule,
    TranslateModule,
    WorkoutTrainingFormComponent,
    LetDirective
  ],
  styleUrls: ['../shared/base-workout-training-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true
})
export class EditWorkoutTrainingDialogComponent extends BaseWorkoutTrainingDialogComponent implements OnInit {
  override titleKey = 'apps.workout-trainings.list.editTraining.title';
  override actionButtonKey = 'common.actions.edit';

  ngOnInit(): void {
    this.training$ = this.store.select(selectWorkoutTraining);
  }

  protected override handleTrainingAction(training: Training | undefined): void {
    const editedTraining = {
      ...training,
      ...this.workoutTrainingFormComponent?.getTraining(),
    } as Training;
    this.store.dispatch(updateUserTrainingListRequest({ training: editedTraining }));
  }
}
