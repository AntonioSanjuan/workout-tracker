import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import { MuscleInvolvedGroupPipe, UiModule } from '@workout-tracker/ui';
import { Exercise } from '@workout-tracker/models';
import { TranslateModule } from '@ngx-translate/core';
import { MusclePillComponent } from '../muscle-pill/muscle-pill.component';

@Component({
  selector: 'workout-tracker-exercise-card',
  imports: [
    MusclePillComponent,
    MuscleInvolvedGroupPipe,
    CommonModule,
    LetDirective,
    TranslateModule,
    UiModule
  ],
  templateUrl: './exercise-card.component.html',
  styleUrls: ['./exercise-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
})
export class ExerciseCard {
  @Input() public exercise!: Exercise;
}
