import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import { ExerciseTypePillDirective, UiModule } from '@workout-tracker/ui';
import { ExerciseType } from '@workout-tracker/models';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'workout-tracker-exercise-type-pill',
  imports: [
    CommonModule,
    LetDirective,
    ExerciseTypePillDirective,
    TranslateModule,
    UiModule
  ],
  templateUrl: './exercise-type-pill.component.html',
  styleUrls: ['./exercise-type-pill.component.scss'],
  standalone: true,
})
export class ExerciseTypePillComponent {
  @Input() public exerciseType!: ExerciseType;
}
