import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingsService } from '../trainings.service';
import { TrainingsRefService } from '../trainings-ref.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    TrainingsService,
    TrainingsRefService
  ]
})
export class LibsServicesTrainingsModule {}
