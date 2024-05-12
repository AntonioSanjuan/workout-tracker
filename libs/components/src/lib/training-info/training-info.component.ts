import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizedDatePipe, UiModule } from '@workout-tracker/ui';
import { Training } from '@workout-tracker/models';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'workout-tracker-training-info',
  imports: [
    CommonModule,
    UiModule,
    TranslateModule,
    LocalizedDatePipe
  ],
  templateUrl: './training-info.component.html',
  styleUrls: ['./training-info.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class TrainingInfoComponent {
  @Input() public training!: Training
}
