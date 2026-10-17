import { Component, Input, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialogRef } from '@angular/material/dialog';
import { Training } from '@workout-tracker/models';
import { WorkoutTrainingFormComponent } from './workout-training-form/workout-training-form.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'workout-tracker-base-training-dialog',
  templateUrl: './base-workout-training-dialog.component.html',
  styleUrls: ['./base-workout-training-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true
})
export abstract class BaseWorkoutTrainingDialogComponent {
  protected dialogRef: MatDialogRef<any> = inject(MatDialogRef);
  protected store: Store = inject(Store);

  @Input() titleKey: string = '';
  @Input() actionButtonKey: string = '';
  @Input() training$: Observable<Training | undefined> = this.store.select(() => undefined);

  @ViewChild(WorkoutTrainingFormComponent) workoutTrainingFormComponent?: WorkoutTrainingFormComponent;

  /**
   * Handle the training action (add or edit).
   * Subclasses should implement this to dispatch the appropriate action.
   */
  protected abstract handleTrainingAction(training: Training | undefined): void;

  /**
   * Execute the training action if form is valid.
   */
  public submitTraining(training: Training | undefined): void {
    if (this.workoutTrainingFormComponent?.isFormValid()) {
      this.handleTrainingAction(training);
      this.dialogRef.close();
    }
  }

  public getStepperIndex(): number {
    return this.workoutTrainingFormComponent?.getStepperIndex() || 0;
  }

  public nextStep(): void {
    this.workoutTrainingFormComponent?.nextStep();
  }
}
