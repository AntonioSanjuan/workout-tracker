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

@Component({
  selector: 'workout-tracker-exercise-details',
  templateUrl: './workout-exercise-details.component.html',
  imports: [
    UiModule,
    LetDirective,
    TranslateModule,
    NgFor,
    RouterModule
  ],
  styleUrls: ['./workout-exercise-details.component.scss'],
  standalone: true
})
export class WorkoutExerciseDetailsComponent {
  private store: Store = inject(Store)
  private router: Router = inject(Router)
  public exerciseDetails$ =  of({} as Exercise)
  // public exerciseDetails$ =  this.store.select(getExerciseDetails)

  private dialogService = inject(DialogService)

  public editExercise() {
    // this.dialogService.showDialog(EditWorkoutExerciseDetailsDialogComponent, true)
  }

  public openExerciseList() {
    this.router.navigate([AppRoutes.WorkoutExercisesList])
  }
}
