import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UiModule } from '@workout-tracker/ui';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router, RouterModule } from '@angular/router';
import { WorkoutExerciseTemplatesFilterListComponent } from './workout-exercise-templates-list-filter/workout-exercise-templates-list-filter.component';
import { DialogService } from '@workout-tracker/services/dialog';
import { AddWorkoutExerciseTemplateDialogComponent } from './add-workout-exercise-template-dialog/add-workout-exercise-template-dialog.component';
import { addDefaultExerciseTemplateList, getExerciseTemplatesListFiltered, hasDefaultExerciseTemplatesLoaded } from '@workout-tracker/shared-store';
import { LetDirective } from '@ngrx/component';
import { NgFor } from '@angular/common';
import { BannerComponent, ConfirmationDialogComponent, ExerciseTemplateCardComponent, ViewHeaderComponent } from '@workout-tracker/components';
import { AppRoutes, BannerType, ExerciseTemplate } from '@workout-tracker/models';

@Component({
  selector: 'workout-tracker-exercise-templates-list',
  templateUrl: './workout-exercise-templates-list.component.html',
  imports: [
    UiModule,
    LetDirective,
    TranslateModule,
    ExerciseTemplateCardComponent,
    ViewHeaderComponent,
    BannerComponent,
    ConfirmationDialogComponent,
    WorkoutExerciseTemplatesFilterListComponent,
    NgFor,
    RouterModule
  ],
  styleUrls: ['./workout-exercise-templates-list.component.scss'],
  standalone: true
})
export class WorkoutExerciseTemplatesListComponent {
  private store: Store = inject(Store)
  private router: Router = inject(Router)
  private dialogService = inject(DialogService)
  private translateService = inject(TranslateService)

  public filteredExerciseTemplates$ =  this.store.select(getExerciseTemplatesListFiltered)
  public hasDefaultExerciseTemplatesLoaded$ = this.store.select(hasDefaultExerciseTemplatesLoaded)

  public bannerType = BannerType;
  
  public addDefaultExerciseTemplates() {
      this.dialogService.showDialog(ConfirmationDialogComponent, true, {
        data: {
          title: this.translateService.instant('apps.workout-exercises.list.actions.confirmation.title'),
          content: this.translateService.instant('apps.workout-exercises.list.actions.confirmation.content')
        }
      }).subscribe((confirm) => {
        if (confirm) {
          this.store.dispatch(addDefaultExerciseTemplateList())
        }
      })
  }
  public newExerciseTemplate() {
    this.dialogService.showDialog(AddWorkoutExerciseTemplateDialogComponent, false)
  }

  public openExerciseTemplateDetails(exerciseTemplate: ExerciseTemplate) {
    this.router.navigate([`${AppRoutes.WorkoutExerciseTemplatesList}/${exerciseTemplate.id}`])
  }
}
