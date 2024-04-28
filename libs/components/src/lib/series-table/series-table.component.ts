import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '@workout-tracker/ui';
import { TrainingExerciseSerie } from '@workout-tracker/models';

@Component({
  selector: 'workout-tracker-series-table',
  imports: [
    CommonModule,
    UiModule
  ],
  templateUrl: './series-table.component.html',
  styleUrls: ['./series-table.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class SeriesTableComponent {
  displayedColumns: string[] = ['weight', 'repetitions'];


  @Input() public series!: TrainingExerciseSerie[]
}
