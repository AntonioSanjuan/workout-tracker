import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UiModule } from '@workout-tracker/ui';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'workout-tracker-exercises-list',
  templateUrl: './workout-exercises-list.component.html',
  imports: [
    UiModule,
    TranslateModule,
    RouterModule
  ],
  styleUrls: ['./workout-exercises-list.component.scss'],
  standalone: true
})
export class WorkoutExercisesListComponent {
  private store = inject(Store)
}
