import { Component, ViewEncapsulation } from '@angular/core';
import { UiModule } from '@workout-tracker/ui';
import { TranslateModule } from '@ngx-translate/core';
import { Training } from '@workout-tracker/models';
import { addUserTrainingListRequest } from '@workout-tracker/shared-store';
import { WorkoutTrainingFormComponent } from '../shared/workout-training-form/workout-training-form.component';
import { BaseWorkoutTrainingDialogComponent } from '../shared/base-workout-training-dialog.component';
import { LetDirective } from '@ngrx/component';

@Component({
  selector: 'workout-tracker-add-training-dialog',
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
export class AddWorkoutTrainingDialogComponent extends BaseWorkoutTrainingDialogComponent {
  override titleKey = 'apps.workout-trainings.list.addTraining.title';
  override actionButtonKey = 'common.actions.create';

  protected override handleTrainingAction(training: Training | undefined): void {
    const newTraining = {
      ...this.workoutTrainingFormComponent?.getTraining(),
      creationDate: new Date(),
    } as Training;
    this.store.dispatch(addUserTrainingListRequest({ training: newTraining }));
  }
}
