import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseTemplatesService } from '../exercise-templates.service';
import { ExerciseTemplatesRefService } from '../exercise-templates-ref.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    ExerciseTemplatesService,
    ExerciseTemplatesRefService
  ]
})
export class LibsServicesExerciseTemplatesModule {}
