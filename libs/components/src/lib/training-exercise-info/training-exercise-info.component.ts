import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizedDatePipe, UiModule } from '@workout-tracker/ui';
import { TrainingExercise } from '@workout-tracker/models';
import { TranslateModule } from '@ngx-translate/core';

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

  @Input() public trainingExercise!: TrainingExercise

  ngOnChanges(changes: SimpleChanges): void {
      this.maxSerieWeight = this.trainingExercise.series.length > 0 ? Math.max(...this.trainingExercise.series.map((serie) => serie.weight)): 0
      this.totalWeight = this.trainingExercise.series.reduce((accumulator, currentValue) => {
        return accumulator + (currentValue.weight * currentValue.repetitions)
      },0);
  }
}
