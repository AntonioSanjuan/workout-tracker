import { Component, OnDestroy, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UiModule } from '@workout-tracker/ui';
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterModule } from '@angular/router';
import { DialogService } from '@workout-tracker/services/dialog';
import { LetDirective } from '@ngrx/component';
import { NgFor } from '@angular/common';
import { AppRoutes, ExerciseTemplate } from '@workout-tracker/models';
import { of } from 'rxjs';
import { getWorkoutExerciseTemplateTrainingsDetailsFilteredByTemplateById, selectWorkoutExerciseTemplateDetailsState, selectWorkoutExerciseTemplateTrainingsDetails } from './state/workout-exercise-template.selectors';
import { ViewHeaderComponent } from '@workout-tracker/components';

@Component({
  selector: 'workout-tracker-exercise-template',
  templateUrl: './workout-exercise-template.component.html',
  imports: [
    UiModule,
    LetDirective,
    TranslateModule,
    NgFor,
    RouterModule,
    ViewHeaderComponent
  ],
  styleUrls: ['./workout-exercise-template.component.scss'],
  standalone: true
})
export class WorkoutExerciseTemplateComponent {
  private store: Store = inject(Store)
  private router: Router = inject(Router)
  private dialogService = inject(DialogService)

  public exerciseTemplateDetails$ = this.store.select(selectWorkoutExerciseTemplateDetailsState)
  public exerciseTemplateTrainingsDetails$ = this.store.select(getWorkoutExerciseTemplateTrainingsDetailsFilteredByTemplateById)
  
  public appRoutes = AppRoutes

  public editExerciseTemplate() {
    // this.dialogService.showDialog(EditWorkoutExerciseDetailsDialogComponent, true)
  }

  public openExerciseTemplateList() {
    this.router.navigate([AppRoutes.WorkoutExerciseTemplatesList])
  }
}
