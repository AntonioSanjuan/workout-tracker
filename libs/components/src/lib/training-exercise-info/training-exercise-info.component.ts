import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { CommonModule, NgSwitch } from '@angular/common';
import { LocalizedDatePipe, UiModule } from '@workout-tracker/ui';
import { ExerciseType, TrainingExercise } from '@workout-tracker/models';
import { TranslateModule } from '@ngx-translate/core';
import { TrainingExerciseMetrics } from '@workout-tracker/metrics';

@Component({
  selector: 'workout-tracker-training-exercise-info',
  imports: [
    CommonModule,
    UiModule,
    TranslateModule,
    LocalizedDatePipe
  ],
  templateUrl: './training-exercise-info.component.html',
  styleUrls: ['./training-exercise-info.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class TrainingExerciseInfoComponent implements OnChanges {
  public maxSerieWeight = 0;
  public totalWeight = 0;

  public maxSerieSpeed = 0;
  public totalTime = 0;
  public totalDistance = 0;

  protected readonly types = ExerciseType

  @Input() public trainingExercise!: TrainingExercise

  ngOnChanges(changes: SimpleChanges): void {
    this.maxSerieWeight = TrainingExerciseMetrics.getMaxSerieWeight(this.trainingExercise)


    if(this.trainingExercise.exerciseTemplate.type === ExerciseType.Strength) {
      this.totalWeight = TrainingExerciseMetrics.getTotalWeight(this.trainingExercise)
    } else if(this.trainingExercise.exerciseTemplate.type === ExerciseType.Cardiovascular) {
      this.totalTime = TrainingExerciseMetrics.getTotalTime(this.trainingExercise)
      this.totalDistance = TrainingExerciseMetrics.getTotalDistance(this.trainingExercise)
    }

  }
}
