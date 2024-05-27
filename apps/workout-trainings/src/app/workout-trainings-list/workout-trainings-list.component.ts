import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { IntersectionObserverDirective, UiModule } from '@workout-tracker/ui';
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterModule } from '@angular/router';
import { LetDirective } from '@ngrx/component';
import { NgFor } from '@angular/common';
import { AppRoutes, Training } from '@workout-tracker/models';
import { getTrainingListOngoing, getUserTrainingsListRequest, getTrainingsListPagination, getTrainingsList } from '@workout-tracker/shared-store';
import { TrainingCardComponent, ViewHeaderComponent } from '@workout-tracker/components'
import { WorkoutTrainingsFilterListComponent } from './workout-trainings-list-filter/workout-trainings-list-filter.component';
import { AddWorkoutTrainingDialogComponent } from './add-workout-training-dialog/add-workout-training-dialog.component';
import { DialogService } from '@workout-tracker/services/dialog';
@Component({
  selector: 'workout-tracker-trainings-list',
  templateUrl: './workout-trainings-list.component.html',
  imports: [
    UiModule,
    LetDirective,
    IntersectionObserverDirective,
    WorkoutTrainingsFilterListComponent,
    ViewHeaderComponent,
    TranslateModule,
    NgFor,
    RouterModule,
    TrainingCardComponent
  ],
  styleUrls: ['./workout-trainings-list.component.scss'],
  standalone: true
})
export class WorkoutTrainingsListComponent {
  private store: Store = inject(Store)
  private router: Router = inject(Router)
  private dialogService = inject(DialogService)

  public trainingList$ =  this.store.select(getTrainingsList)
  public trainingsPagination$ =  this.store.select(getTrainingsListPagination)
  public trainingOngoing$ = this.store.select(getTrainingListOngoing)

  public newTraining() {
    this.dialogService.showDialog(AddWorkoutTrainingDialogComponent, false)
  }

  public openTrainingDetails(training: Training) {
    if(training) {
      this.router.navigate([`${AppRoutes.WorkoutTrainingsList}/${training.id}`])
    }
  }

  public isIntersecting(isIntersecting: boolean): void {
    if (isIntersecting) {
      // Load more data, update the UI, etc.
      this.store.dispatch(getUserTrainingsListRequest())
    }
  }
}
