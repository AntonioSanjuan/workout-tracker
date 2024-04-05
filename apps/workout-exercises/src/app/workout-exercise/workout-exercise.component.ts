import { Component, OnDestroy, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UiModule } from '@workout-tracker/ui';
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterModule } from '@angular/router';
import { DialogService } from '@workout-tracker/services/dialog';
import { getExercisesFiltered } from '@workout-tracker/shared-store';
import { LetDirective } from '@ngrx/component';
import { NgFor } from '@angular/common';
import { AppRoutes, Exercise } from '@workout-tracker/models';
import { of } from 'rxjs';
import { selectWorkoutExerciseDetailsState } from './state/workout-exercise.selectors';
import { ViewHeaderComponent } from '@workout-tracker/components';

@Component({
  selector: 'workout-tracker-exercise',
  templateUrl: './workout-exercise.component.html',
  imports: [
    UiModule,
    LetDirective,
    TranslateModule,
    NgFor,
    RouterModule,
    ViewHeaderComponent
  ],
  styleUrls: ['./workout-exercise.component.scss'],
  standalone: true
})
export class WorkoutExerciseComponent {
  private store: Store = inject(Store)
  private router: Router = inject(Router)
  private dialogService = inject(DialogService)

  public exerciseDetails$ = this.store.select(selectWorkoutExerciseDetailsState)
  
  public appRoutes = AppRoutes

  public editExercise() {
    // this.dialogService.showDialog(EditWorkoutExerciseDetailsDialogComponent, true)
  }

  public openExerciseList() {
    this.router.navigate([AppRoutes.WorkoutExercisesList])
  }
}
