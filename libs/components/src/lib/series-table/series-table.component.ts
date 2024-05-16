import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '@workout-tracker/ui';
import { TrainingExerciseSerie } from '@workout-tracker/models';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'workout-tracker-series-table',
  imports: [
    CommonModule,
    TranslateModule,
    UiModule
  ],
  templateUrl: './series-table.component.html',
  styleUrls: ['./series-table.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class SeriesTableComponent implements OnInit {
  displayedColumns: string[] = ['weight', 'repetitions'];

  @Input() public series?: TrainingExerciseSerie[]
  @Input() public actions = false
  @Output() public delete?: any  = new EventEmitter<void>();
  @Output() public edit?: any  = new EventEmitter<void>();

  ngOnInit(): void {
      if(this.actions) {
        this.displayedColumns.push('actions')
      }
  }

  deleteSerie(serie: TrainingExerciseSerie) {
    this.delete.emit(serie)
  }
  editSerie(serie: TrainingExerciseSerie) {
    this.edit.emit(serie)
  }
}
