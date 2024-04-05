import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { LetDirective } from '@ngrx/component';
import { MuscleGroupPillDirective, MuscleInvolvedGroupPipe, accordionAnimation, rotateAnimation } from '@workout-tracker/ui';
import { TranslateModule } from '@ngx-translate/core';
import { UiModule } from '@workout-tracker/ui';
import { MusclesInvolved, muscleInvolvedByGroups } from '@workout-tracker/models';
import { clearExerciseTemplateQueryFilter, getExerciseTemplatesFilters, setExerciseTemplateNameQueryFilter, setExerciseTemplateMuscleInvolvedQueryFilter } from '@workout-tracker/shared-store';
import { BannerComponent, MusclePillComponent, MusclesSelectorComponent } from '@workout-tracker/components';
import { ExercisesListFilterForm, exerciseListFilterForm } from './workout-trainings-list-filter.service.form';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'workout-tracker-exercises-list-filter',
  imports: [
    UiModule,
    LetDirective,
    TranslateModule,
    BannerComponent,
    MusclePillComponent,
    MusclesSelectorComponent,
    MuscleInvolvedGroupPipe,
  ],
  templateUrl: './workout-exercises-list-filter.component.html',
  styleUrls: ['./workout-exercises-list-filter.component.scss'],
  animations: [rotateAnimation, accordionAnimation],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
})
export class WorkoutExercisesFilterListComponent implements OnInit {
  private store: Store = inject(Store)
  public exercisesFilters$ = this.store.select(getExerciseTemplatesFilters)
  public musclesByGroup = muscleInvolvedByGroups;

  //filters
  public collapsed = true;
  public exercisesListFilterForm: FormGroup<ExercisesListFilterForm> | undefined


  public ngOnInit(): void {
    this.exercisesListFilterForm = exerciseListFilterForm()
  }

  public toggle(): void {
    this.collapsed = !this.collapsed;
  }

  public filterByMuscleInvolved(muscleInvolved: MusclesInvolved): void {
    this.store.dispatch(setExerciseTemplateMuscleInvolvedQueryFilter({ 
      muscleInvolved: muscleInvolved
    }))
  }
  
  public clearMuscleInvolvedFilter(): void {
    this.store.dispatch(clearExerciseTemplateQueryFilter())
  }

  public searchByName() {
    const formValues = this.exercisesListFilterForm?.getRawValue()
    if(formValues?.byName) {
      this.store.dispatch(setExerciseTemplateNameQueryFilter({ 
        exerciseName: formValues?.byName
      }))
    }
  }

  public clearFilters() {
    this.exercisesListFilterForm = exerciseListFilterForm()
    this.store.dispatch(clearExerciseTemplateQueryFilter())
  }
}
