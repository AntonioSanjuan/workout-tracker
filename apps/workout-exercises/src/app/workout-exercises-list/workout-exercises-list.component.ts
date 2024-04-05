import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UiModule } from '@workout-tracker/ui';
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterModule } from '@angular/router';
import { WorkoutExercisesFilterListComponent } from './workout-exercises-list-filter/workout-exercises-list-filter.component';
import { DialogService } from '@workout-tracker/services/dialog';
import { AddWorkoutExerciseDialogComponent } from './add-workout-exercise.dialog/add-workout-exercise-dialog.component';
import { getExerciseTemplatesFiltered } from '@workout-tracker/shared-store';
import { LetDirective } from '@ngrx/component';
import { NgFor } from '@angular/common';
import { ExerciseTemplateCardComponent } from '@workout-tracker/components';
import { AppRoutes, ExerciseTemplate } from '@workout-tracker/models';

@Component({
  selector: 'workout-tracker-exercises-list',
  templateUrl: './workout-exercises-list.component.html',
  imports: [
    UiModule,
    LetDirective,
    TranslateModule,
    ExerciseTemplateCardComponent,
    WorkoutExercisesFilterListComponent,
    NgFor,
    RouterModule
  ],
  styleUrls: ['./workout-exercises-list.component.scss'],
  standalone: true
})
export class WorkoutExercisesListComponent {
  private store: Store = inject(Store)
  private router: Router = inject(Router)
  private dialogService = inject(DialogService)

  public filteredExerciseTemplates$ =  this.store.select(getExerciseTemplatesFiltered)


  public newExercise() {
    this.dialogService.showDialog(AddWorkoutExerciseDialogComponent, true)
  }

  public openExerciseDetails(exercise: ExerciseTemplate) {
    this.router.navigate([`${AppRoutes.WorkoutExercisesList}/${exercise.id}`])
  }
}
