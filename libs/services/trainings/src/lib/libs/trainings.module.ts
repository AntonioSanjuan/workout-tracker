import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingsService } from '../trainings.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    TrainingsService
  ]
})
export class LibsServicesTrainingsModule {}
