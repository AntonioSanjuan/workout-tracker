import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import { LocalizedDatePipe, MuscleInvolvedGroupPipe, UiModule } from '@workout-tracker/ui';
import { Training } from '@workout-tracker/models';
import { TranslateModule } from '@ngx-translate/core';
import { MusclePillComponent } from '../muscle-pill/muscle-pill.component';



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
export class TrainingCardComponent {
  @Input() public training!: Training;
}
