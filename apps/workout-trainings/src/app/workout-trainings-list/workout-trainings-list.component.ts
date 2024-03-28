import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UiModule } from '@workout-tracker/ui';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { LetDirective } from '@ngrx/component';
import { NgFor } from '@angular/common';
import { Training } from '@workout-tracker/models';
import { of } from 'rxjs';
import { getTrainingsFiltered, getTrainingOngoing } from '@workout-tracker/shared-store';
import { TrainingCardComponent } from '@workout-tracker/components'
@Component({
  selector: 'workout-tracker-trainings-list',
  templateUrl: './workout-trainings-list.component.html',
  imports: [
    UiModule,
    LetDirective,
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
  public trainingOngoing$ = this.store.select(getTrainingOngoing)

  public newTraining() {
    console.log("new training")
  }

  public openTrainingDetails(training: Training) {
    console.log("training", training)
  }
}
