import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UiModule } from '@workout-tracker/ui';
import { TranslateModule } from '@ngx-translate/core';
import { getTrainingFormValue, WorkoutTrainingForm, workoutTrainingForm } from './workout-training-form.form';
import { FormGroup } from '@angular/forms';
import { MuscleGroups, Training } from '@workout-tracker/models';
import { MusclesGroupsSelectorComponent } from '@workout-tracker/components';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'workout-tracker-training-form',
  templateUrl: './workout-training-form.component.html',
  imports: [
    UiModule,
    TranslateModule,
    MusclesGroupsSelectorComponent
  ],
  styleUrls: ['./workout-training-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true
})
export class WorkoutTrainingFormComponent implements OnInit {
  protected form!: FormGroup<WorkoutTrainingForm>
  protected readonly muscleGroups = MuscleGroups

  @Input() public training: Training | undefined
  @ViewChild('stepper', { static: false }) private stepper!: MatStepper;

  ngOnInit(): void {
    this.form = workoutTrainingForm(this.training)
  }

  public getStepperIndex(): number {
    return this.stepper.selectedIndex
  }

  public nextStep() {
    this.stepper.next()
  }

  public isFormValid() { return this.form.valid }

  public getTraining(): Partial<Training> {
    return getTrainingFormValue(this.form)
  }
}
