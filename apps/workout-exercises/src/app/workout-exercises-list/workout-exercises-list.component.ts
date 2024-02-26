import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UiModule } from '@workout-tracker/ui';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { WorkoutExercisesFilterListComponent } from './workout-exercises-list-filter/workout-exercises-list-filter.component';

@Component({
  selector: 'workout-tracker-exercises-list',
  templateUrl: './workout-exercises-list.component.html',
  imports: [
    UiModule,
    TranslateModule,
    WorkoutExercisesFilterListComponent,
    RouterModule
  ],
  styleUrls: ['./workout-exercises-list.component.scss'],
  standalone: true
})
export class WorkoutExercisesListComponent {
  private store = inject(Store)
}
