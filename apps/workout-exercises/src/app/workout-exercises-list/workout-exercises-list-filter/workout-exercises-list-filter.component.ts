import { Component, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { LetDirective } from '@ngrx/component';
import { accordionAnimation, rotateAnimation } from '@workout-tracker/ui';
import { TranslateModule } from '@ngx-translate/core';
import { UiModule } from '@workout-tracker/ui';
import { MusclesInvolved } from '@workout-tracker/models';
import { clearExerciseQueryFilter, getExercisesFilters, setExerciseNameQueryFilter, setExerciseMuscleInvolvedQueryFilter } from '@workout-tracker/shared-store';
import { BannerComponent } from '@workout-tracker/components';

@Component({
  selector: 'workout-tracker-exercises-list-filter',
  imports: [
    UiModule,
    CommonModule,
    LetDirective,
    TranslateModule,
    BannerComponent
  ],
  templateUrl: './workout-exercises-list-filter.component.html',
  styleUrls: ['./workout-exercises-list-filter.component.scss'],
  animations: [rotateAnimation, accordionAnimation],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
})
export class WorkoutExercisesFilterListComponent {
  private store: Store = inject(Store)
  public exercisesFilters$ = this.store.select(getExercisesFilters)
  public muclesInvolved = Object.values(MusclesInvolved) as MusclesInvolved[]
  //filters
  public collapsed = true;

  public toggle(): void {
    this.collapsed = !this.collapsed;
  }

  public filterByMuscleInvolved(muscleInvolved: MusclesInvolved): void {
    this.store.dispatch(setExerciseMuscleInvolvedQueryFilter({ 
      muscleInvolved: muscleInvolved
    }))
  }
  
  public clearMuscleInvolvedFilter(): void {
    this.store.dispatch(clearExerciseQueryFilter())
  }

  public searchByName(byName: string) {
    this.store.dispatch(setExerciseNameQueryFilter({ 
      exerciseName: byName
    }))
  }
}
