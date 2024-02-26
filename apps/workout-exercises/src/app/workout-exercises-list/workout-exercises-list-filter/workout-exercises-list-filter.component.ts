import { Component, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { LetDirective } from '@ngrx/component';
import { accordionAnimation, rotateAnimation } from '@workout-tracker/ui';
import { TranslateModule } from '@ngx-translate/core';
import { UiModule } from '@workout-tracker/ui';
import { ExerciseType } from '@workout-tracker/models';
import { clearExerciseQueryFilter, getExercisesFilters, setExerciseNameQueryFilter, setExerciseTypeQueryFilter } from '@workout-tracker/shared-store';
import { BannerComponent, ExerciseTypePillComponent } from '@workout-tracker/components';

@Component({
  selector: 'workout-tracker-exercises-list-filter',
  imports: [
    UiModule,
    CommonModule,
    LetDirective,
    TranslateModule,
    ExerciseTypePillComponent,
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
  public exerciseTypes = Object.values(ExerciseType) as ExerciseType[]
  //filters
  public collapsed = true;

  public toggle(): void {
    this.collapsed = !this.collapsed;
  }

  public filterByExerciseType(exerciseType: ExerciseType): void {
    this.store.dispatch(setExerciseTypeQueryFilter({ 
      exerciseType: exerciseType
    }))
  }
  
  public clearExerciseTypeFilter(): void {
    this.store.dispatch(clearExerciseQueryFilter())
  }

  public searchByName(byName: string) {
    this.store.dispatch(setExerciseNameQueryFilter({ 
      exerciseName: byName
    }))
  }
}
