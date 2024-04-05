import { of } from 'rxjs'
import { ExerciseTemplatesService } from './exercise-templates.service';
import { AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { ExerciseTemplate } from '@workout-tracker/models';

export const exerciseTemplatesServiceMock: Partial<ExerciseTemplatesService> = {
  getExerciseTemplateDocRef: () => { return {} as AngularFirestoreDocument},
  getExerciseTemplate: () => of({} as ExerciseTemplate),
  getExerciseTemplates: () => of([] as ExerciseTemplate[]),
  setExerciseTemplate: () => of({} as ExerciseTemplate),
  updateExerciseTemplate: () => of({} as ExerciseTemplate),
  deleteExerciseTemplate: () => of(true),
}
