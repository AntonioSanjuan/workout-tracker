import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { LetDirective } from '@ngrx/component';
import { MuscleGroupPillDirective, MuscleInvolvedGroupPipe, accordionAnimation, rotateAnimation } from '@workout-tracker/ui';
import { TranslateModule } from '@ngx-translate/core';
import { UiModule } from '@workout-tracker/ui';
import { ExerciseEquipment, MusclesInvolved, muscleInvolvedByGroups } from '@workout-tracker/models';
import { clearExerciseTemplateListQueryFilter, getExerciseTemplatesListFilters, setExerciseTemplateListNameQueryFilter, setExerciseTemplateListMuscleInvolvedQueryFilter, setExerciseTemplateListEquipmentQueryFilter } from '@workout-tracker/shared-store';
import { BannerComponent, EquipmentSelectorComponent, MusclePillComponent, MusclesSelectorComponent } from '@workout-tracker/components';
import { ExerciseTemplatesListFilterForm, exerciseTemplatesListFilterForm } from './workout-exercise-templates-list-filter.service.form';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'workout-tracker-exercise-templates-list-filter',
  imports: [
    UiModule,
    LetDirective,
    TranslateModule,
    BannerComponent,
    MusclePillComponent,
    MusclesSelectorComponent,
    EquipmentSelectorComponent,
    MuscleInvolvedGroupPipe,
  ],
  templateUrl: './workout-exercise-templates-list-filter.component.html',
  styleUrls: ['./workout-exercise-templates-list-filter.component.scss'],
  animations: [rotateAnimation, accordionAnimation],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
})
export class WorkoutExerciseTemplatesFilterListComponent implements OnInit {
  private store: Store = inject(Store)
  public exerciseTemplatesFilters$ = this.store.select(getExerciseTemplatesListFilters)
  public musclesByGroup = muscleInvolvedByGroups;

  //filters
  public collapsed = true;
  public exerciseTemplatesListFilterForm: FormGroup<ExerciseTemplatesListFilterForm> | undefined


  public ngOnInit(): void {
    this.exerciseTemplatesListFilterForm = exerciseTemplatesListFilterForm()
  }

  public toggle(): void {
    this.collapsed = !this.collapsed;
  }

  public filterByMuscleInvolved(muscleInvolved: MusclesInvolved): void {
    this.store.dispatch(setExerciseTemplateListMuscleInvolvedQueryFilter({ 
      muscleInvolved: muscleInvolved
    }))
  }

  public filterByEquipment(equipment: ExerciseEquipment): void {
    this.store.dispatch(setExerciseTemplateListEquipmentQueryFilter({ 
      equipment: equipment
    }))
  }
  
  public clearMuscleInvolvedFilter(): void {
    this.store.dispatch(clearExerciseTemplateListQueryFilter())
  }

  public searchByName() {
    const formValues = this.exerciseTemplatesListFilterForm?.getRawValue()
    if(formValues?.byName) {
      this.store.dispatch(setExerciseTemplateListNameQueryFilter({ 
        exerciseName: formValues?.byName
      }))
    }
  }

  public clearFilters() {
    this.exerciseTemplatesListFilterForm = exerciseTemplatesListFilterForm()
    this.store.dispatch(clearExerciseTemplateListQueryFilter())
  }
}
