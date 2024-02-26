import { Component, OnDestroy, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UiModule } from '@workout-tracker/ui';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { WorkoutExercisesFilterListComponent } from './workout-exercises-list-filter/workout-exercises-list-filter.component';
import { DialogService } from '@workout-tracker/services/dialog';
import { AddWorkoutExerciseDialogComponent } from './add-workout-exercise.dialog/add-workout-exercise-dialog.component';

@Component({
  selector: 'workout-tracker-exercises-list',
  templateUrl: './workout-exercises-list.component.html',
  imports: [
    UiModule,
    TranslateModule,
    WorkoutExercisesFilterListComponent,
    RouterModule
  ],
  providers: [DialogService],
  styleUrls: ['./workout-exercises-list.component.scss'],
  standalone: true
})
export class WorkoutExercisesListComponent {
  private dialogService = inject(DialogService)

  public newExercise() {
    this.dialogService.showDialog(AddWorkoutExerciseDialogComponent)
  }
}
