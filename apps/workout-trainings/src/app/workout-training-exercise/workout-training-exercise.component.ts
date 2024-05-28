import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UiModule } from '@workout-tracker/ui';
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterModule } from '@angular/router';
import { DialogService } from '@workout-tracker/services/dialog';
import { LetDirective } from '@ngrx/component';
import { NgFor } from '@angular/common';
import { AppRoutes, BannerType, ExerciseTemplate, TrainingExerciseSerie } from '@workout-tracker/models';
import { BannerComponent, DividerComponent, ExerciseTemplateCardComponent, SeriesTableComponent, TrainingExerciseCardComponent, ViewHeaderComponent } from '@workout-tracker/components';
import { selectWorkoutTrainingExercise, selectWorkoutTrainingExerciseParentTrainingId, selectWorkoutTrainingExercisePreviousSimilarTraining } from './state/workout-training-exercise.selectors';
import { AddWorkoutTrainingExerciseSerieDialogComponent } from './add-workout-training-exercise-serie-dialog/add-workout-training-exercise-serie-dialog.component';
import { deleteUserTrainingExerciseSerieRequest } from './state/workout-training-exercise.actions';
import { TrainingExerciseInfoComponent } from 'libs/components/src/lib/training-exercise-info/training-exercise-info.component';

@Component({
  selector: 'workout-tracker-training-exercise',
  templateUrl: './workout-training-exercise.component.html',
  imports: [
    UiModule,
    LetDirective,
    TranslateModule,
    DividerComponent,
    NgFor,
    RouterModule,
    ViewHeaderComponent,
    TrainingExerciseInfoComponent,
    SeriesTableComponent,
    ExerciseTemplateCardComponent,
    TrainingExerciseCardComponent,
    BannerComponent
  ],
  styleUrls: ['./workout-training-exercise.component.scss'],
  standalone: true
})
export class WorkoutTrainingExerciseComponent {
  private store: Store = inject(Store)
  private router: Router = inject(Router)
  private dialogService = inject(DialogService)

  public trainingExerciseParentId$ = this.store.select(selectWorkoutTrainingExerciseParentTrainingId)
  public trainingExercise$ = this.store.select(selectWorkoutTrainingExercise)
  public trainingExercisePreviousSimilarTraining$ = this.store.select(selectWorkoutTrainingExercisePreviousSimilarTraining)
  
  public appRoutes = AppRoutes
  public bannerType = BannerType;

  public editTrainingSerie() {
    // this.dialogService.showDialog(EditWorkoutExerciseDetailsDialogComponent, true)
  }

  public newTrainingExerciseSerie() {
    this.dialogService.showDialog(AddWorkoutTrainingExerciseSerieDialogComponent, false)
  }

  public openExerciseTemplateDetails(exerciseTemplate: ExerciseTemplate) {
    this.router.navigate([`${AppRoutes.WorkoutExerciseTemplatesList}/${exerciseTemplate.id}`])
  }
  
  public deleteTrainingExerciseSerie(serie: TrainingExerciseSerie) {
    this.store.dispatch(deleteUserTrainingExerciseSerieRequest({ trainingExerciseSerie: serie }))
  }
  
  public editTrainingExerciseSerie(serie: TrainingExerciseSerie) {
    console.log("editing", serie)
  }
}
