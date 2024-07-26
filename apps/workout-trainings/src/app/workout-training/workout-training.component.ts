import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UiModule } from '@workout-tracker/ui';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DialogService } from '@workout-tracker/services/dialog';
import { LetDirective } from '@ngrx/component';
import { NgFor } from '@angular/common';
import { AppRoutes, BannerType, Training, TrainingExercise } from '@workout-tracker/models';
import { selectWorkoutTraining } from './state/workout-training.selectors';
import { BannerComponent, ConfirmationDialogComponent, DividerComponent, MusclePillComponent, TrainingExerciseCardComponent, TrainingInfoComponent, ViewHeaderComponent } from '@workout-tracker/components';
import { AddWorkoutTrainingExerciseDialogComponent } from './add-workout-training-exercise-dialog/add-workout-training-exercise-dialog.component';
import { copyUserTrainingListRequest, getExerciseTemplatesList } from '@workout-tracker/shared-store';

@Component({
  selector: 'workout-tracker-training',
  templateUrl: './workout-training.component.html',
  imports: [
    UiModule,
    LetDirective,
    TranslateModule,
    NgFor,
    RouterModule,
    ViewHeaderComponent,
    DividerComponent,
    TrainingInfoComponent,
    TrainingExerciseCardComponent,
    MusclePillComponent,
    BannerComponent,
  ],
  styleUrls: ['./workout-training.component.scss'],
  standalone: true
})
export class WorkoutTrainingComponent {
  private store: Store = inject(Store)
  private router: Router = inject(Router)
  private dialogService = inject(DialogService)
  private translateService = inject(TranslateService)

  public training$ = this.store.select(selectWorkoutTraining)
  public exerciseTemplates$ = this.store.select(getExerciseTemplatesList)

  public appRoutes = AppRoutes
  public bannerType = BannerType


  public editTraining() {
    // this.dialogService.showDialog(EditWorkoutExerciseDetailsDialogComponent, true)
  }

  public printTraining() {
    window.print()
  }

  public copyTraining(training: Training | undefined) {
    if (training) {
      this.dialogService.showDialog(ConfirmationDialogComponent, true, {
        data: {
          title: this.translateService.instant('apps.workout-trainings.training.copyTraining.title'),
          content: this.translateService.instant('apps.workout-trainings.training.copyTraining.content')
        }
      }).subscribe((confirm) => {
        if (confirm) {
          this.store.dispatch(copyUserTrainingListRequest({ training: training }))
        }
      })
    }
  }

  public newTrainingExercise() {
    this.dialogService.showDialog(AddWorkoutTrainingExerciseDialogComponent, false)
  }

  public openTrainingExercise(training: Training, trainingExercise: TrainingExercise) {
    this.router.navigate([`/trainings/${training.id}/exercise/${trainingExercise.id}`])
  }

  public goToExerciseTemplates() {
    this.router.navigate([AppRoutes.WorkoutExerciseTemplatesList])
  }
}
