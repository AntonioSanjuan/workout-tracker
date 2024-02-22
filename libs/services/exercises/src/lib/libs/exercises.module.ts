import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExercisesService } from '../exercises.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    ExercisesService
  ]
})
export class LibsServicesExercisesModule {}
