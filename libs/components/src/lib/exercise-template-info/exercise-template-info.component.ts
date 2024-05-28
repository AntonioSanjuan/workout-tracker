import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizedDatePipe, UiModule } from '@workout-tracker/ui';
import { ExerciseTemplate } from '@workout-tracker/models';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'workout-tracker-exercise-template-info',
  imports: [
    CommonModule,
    UiModule,
    TranslateModule,
    LocalizedDatePipe
  ],
  templateUrl: './exercise-template-info.component.html',
  styleUrls: ['./exercise-template-info.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class ExerciseTemplateInfoComponent {
  @Input() public exerciseTemplate!: ExerciseTemplate
}
