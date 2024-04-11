import { of } from 'rxjs'
import { ExerciseTemplatesService } from './exercise-templates.service';
import { ExerciseTemplate } from '@workout-tracker/models';

export const exerciseTemplatesServiceMock: Partial<ExerciseTemplatesService> = {
  getExerciseTemplate: () => of({} as ExerciseTemplate),
  getExerciseTemplates: () => of([] as ExerciseTemplate[]),
  setExerciseTemplate: () => of({} as ExerciseTemplate),
  updateExerciseTemplate: () => of({} as ExerciseTemplate),
  deleteExerciseTemplate: () => of(true),
}
