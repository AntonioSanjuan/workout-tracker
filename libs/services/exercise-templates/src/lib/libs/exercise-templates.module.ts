import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseTemplatesService } from '../exercise-templates.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    ExerciseTemplatesService
  ]
})
export class LibsServicesExerciseTemplatesModule {}
