import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { LetDirective } from '@ngrx/component';
import { MuscleGroupPillDirective, MuscleInvolvedGroupPipe, accordionAnimation, rotateAnimation } from '@workout-tracker/ui';
import { TranslateModule } from '@ngx-translate/core';
import { UiModule } from '@workout-tracker/ui';
import { MuscleGroups } from '@workout-tracker/models';
import { setTrainingQueryFilter, getTrainingsFilters, clearTrainingQueryFilter } from '@workout-tracker/shared-store';
import { BannerComponent, MusclePillComponent, MusclesGroupsSelectorComponent, MusclesSelectorComponent } from '@workout-tracker/components';
import { FormGroup } from '@angular/forms';
import { TrainingsListFilterForm, trainingsListFilterForm } from './workout-trainings-list-filter.service.form';

@Component({
  selector: 'workout-tracker-trainings-list-filter',
  imports: [
    UiModule,
    LetDirective,
    TranslateModule,
    BannerComponent,
    MusclePillComponent,
    MusclesSelectorComponent,
    MuscleInvolvedGroupPipe,
    MuscleGroupPillDirective,
    MusclesGroupsSelectorComponent,
  ],
  templateUrl: './workout-trainings-list-filter.component.html',
  styleUrls: ['./workout-trainings-list-filter.component.scss'],
  animations: [rotateAnimation, accordionAnimation],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
})
export class WorkoutTrainingsFilterListComponent implements OnInit {
  private store: Store = inject(Store)
  public trainingsFilters$ = this.store.select(getTrainingsFilters)
  public muscleGroups = MuscleGroups;

  //filters
  public collapsed = true;
  public trainingsListFilterForm: FormGroup<TrainingsListFilterForm> | undefined


  public ngOnInit(): void {
    this.trainingsListFilterForm = trainingsListFilterForm()
  }

  public toggle(): void {
    this.collapsed = !this.collapsed;
  }

  public search() {
    const formValues = this.trainingsListFilterForm?.getRawValue()
    this.store.dispatch(setTrainingQueryFilter({ 
      filters: {
        betweenDates: 
          (formValues?.fromDate && formValues?.toDate) ? 
          {
            fromDate: formValues?.fromDate,
            toDate: formValues?.toDate
          } : 
          undefined,
        muscleGroups: formValues?.muscleGroups ?? []
      }
    }))
  }

  public clearFilters(){
    this.trainingsListFilterForm = trainingsListFilterForm()
    this.store.dispatch(clearTrainingQueryFilter())
  }
}
