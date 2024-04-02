import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { IntersectionObserverDirective, UiModule } from '@workout-tracker/ui';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { LetDirective } from '@ngrx/component';
import { NgFor } from '@angular/common';
import { Training } from '@workout-tracker/models';
import { of } from 'rxjs';
import { getTrainingsFiltered, getTrainingOngoing, addUserTrainingRequest, getUserTrainingsRequest, getTrainingsPagination } from '@workout-tracker/shared-store';
import { TrainingCardComponent } from '@workout-tracker/components'
import { WorkoutTrainingsFilterListComponent } from './workout-trainings-list-filter/workout-trainings-list-filter.component';
@Component({
  selector: 'workout-tracker-trainings-list',
  templateUrl: './workout-trainings-list.component.html',
  imports: [
    UiModule,
    LetDirective,
    IntersectionObserverDirective,
    WorkoutTrainingsFilterListComponent,
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

  public filteredTrainings$ =  this.store.select(getTrainingsFiltered)
  public trainingsPagination$ =  this.store.select(getTrainingsPagination)
  public trainingOngoing$ = this.store.select(getTrainingOngoing)

  public newTraining() {
    console.log("new training")
    this.store.dispatch(addUserTrainingRequest({ 
      training: { 
        creationDate: new Date(), 
        observations: 'a mano creacion'
      } as Training
    }))
  }

  public openTrainingDetails(training: Training) {
    console.log("training", training)
  }

  public isIntersecting(isIntersecting: boolean): void {
    if (isIntersecting) {
      // Load more data, update the UI, etc.
      this.store.dispatch(getUserTrainingsRequest())
    }
  }
}
