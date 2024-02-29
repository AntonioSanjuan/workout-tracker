import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import { UiModule } from '@workout-tracker/ui';
import { Exercise } from '@workout-tracker/models';
import { TranslateModule } from '@ngx-translate/core';
import { ExerciseTypePillComponent } from '../exercise-type-pill/exercise-type-pill.component';

@Component({
  selector: 'workout-tracker-exercise-card',
  imports: [
    CommonModule,
    LetDirective,
    TranslateModule,
    ExerciseTypePillComponent,
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
