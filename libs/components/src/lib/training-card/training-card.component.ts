import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import { LocalizedDatePipe, MuscleInvolvedGroupPipe, UiModule } from '@workout-tracker/ui';
import { Exercise, MuscleGroups, MusclesInvolved, Training, TrainingExercise, getMuscleInvolvedGroup } from '@workout-tracker/models';
import { TranslateModule } from '@ngx-translate/core';
import { MusclePillComponent } from '../muscle-pill/muscle-pill.component';


interface MuscleGroupExercises {
  muscleGroup: MuscleGroups,
  numberOfExercises: number
}
@Component({
  selector: 'workout-tracker-training-card',
  imports: [
    MusclePillComponent,
    MuscleInvolvedGroupPipe,
    LocalizedDatePipe,
    CommonModule,
    LetDirective,
    TranslateModule,
    UiModule
  ],
  templateUrl: './training-card.component.html',
  styleUrls: ['./training-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
})
export class TrainingCardComponent implements OnInit {
  @Input() public training!: Training;
  public muscleGroupExercises: MuscleGroupExercises[] = []

  ngOnInit(): void {
    const counter: { [key in MuscleGroups]: number } = {} as { [key in MuscleGroups]: number };

    //to-do refactor
    if (this.training.trainingExercises) {
        this.training.trainingExercises.forEach((trainingExercise: TrainingExercise) => {
            trainingExercise.exerciseTemplate.musclesInvolved.forEach((muscleInvolved: MusclesInvolved) => {
                const muscleInvolvedGroup = getMuscleInvolvedGroup(muscleInvolved);
                if (muscleInvolvedGroup) {
                  (counter[muscleInvolvedGroup]) = (counter[muscleInvolvedGroup] || 0) + 1;
                }
            });
        });

        for (const [muscleGroup, numberOfExercises] of Object.entries(counter)) {
            this.muscleGroupExercises.push({ muscleGroup: muscleGroup as MuscleGroups, numberOfExercises });
        }
    }
  }
}
