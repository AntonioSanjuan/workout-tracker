import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UiModule } from '@workout-tracker/ui';
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterModule } from '@angular/router';
import { DialogService } from '@workout-tracker/services/dialog';
import { LetDirective } from '@ngrx/component';
import { NgFor } from '@angular/common';
import { AppRoutes } from '@workout-tracker/models';
import { of } from 'rxjs';

@Component({
  selector: 'workout-tracker-trainings',
  templateUrl: './workout-trainings.component.html',
  imports: [
    UiModule,
    LetDirective,
    TranslateModule,
    NgFor,
    RouterModule
  ],
  styleUrls: ['./workout-trainings.component.scss'],
  standalone: true
})
export class WorkoutTrainingsComponent {
  private store: Store = inject(Store)
}
