import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import { DefaultExerciseTemplateImagePipe, MuscleInvolvedGroupPipe, UiModule } from '@workout-tracker/ui';
import { ExerciseTemplate } from '@workout-tracker/models';
import { TranslateModule } from '@ngx-translate/core';
import { MusclePillComponent } from '../muscle-pill/muscle-pill.component';

@Component({
  selector: 'workout-tracker-exercise-template-card',
  imports: [
    MusclePillComponent,
    MuscleInvolvedGroupPipe,
    DefaultExerciseTemplateImagePipe,
    CommonModule,
    LetDirective,
    TranslateModule,
    UiModule
  ],
  templateUrl: './exercise-template-card.component.html',
  styleUrls: ['./exercise-template-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
})
export class ExerciseTemplateCardComponent {
  @Input() public exerciseTemplate!: ExerciseTemplate;
  @Input() public selected = false;
}
