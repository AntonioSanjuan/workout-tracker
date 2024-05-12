import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import { MuscleInvolvedGroupPipe, UiModule } from '@workout-tracker/ui';
import { TrainingExercise } from '@workout-tracker/models';
import { TranslateModule } from '@ngx-translate/core';
import { MusclePillComponent } from '../muscle-pill/muscle-pill.component';
import { SeriesTableComponent } from '../series-table/series-table.component';
import { TrainingExerciseInfoComponent } from '../training-exercise-info/training-exercise-info.component';

@Component({
  selector: 'workout-tracker-training-exercise-card',
  imports: [
    MusclePillComponent,
    SeriesTableComponent,
    MuscleInvolvedGroupPipe,
    TrainingExerciseInfoComponent,
    CommonModule,
    LetDirective,
    TranslateModule,
    UiModule
  ],
  templateUrl: './training-exercise-card.component.html',
  styleUrls: ['./training-exercise-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
})
export class TrainingExerciseCardComponent {
  @Input() public trainingExercise!: TrainingExercise;
}
