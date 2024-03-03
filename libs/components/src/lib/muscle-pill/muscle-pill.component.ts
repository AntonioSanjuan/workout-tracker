import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import { MuscleGroupPillDirective, UiModule } from '@workout-tracker/ui';
import { MuscleGroups, MusclesInvolved } from '@workout-tracker/models';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'workout-tracker-muscle-pill',
  imports: [
    CommonModule,
    LetDirective,
    MuscleGroupPillDirective,
    TranslateModule,
    UiModule
  ],
  templateUrl: './muscle-pill.component.html',
  styleUrls: ['./muscle-pill.component.scss'],
  standalone: true,
})
export class MusclePillComponent {
  @Input() public muscleGroup?: MuscleGroups = MuscleGroups.Arms;
  @Input() public specificMuscle?: MusclesInvolved;
}
