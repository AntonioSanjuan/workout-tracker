import { AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { ExerciseTemplatesRefService } from './exercise-templates-ref.service';

export const exerciseTemplatesRefServiceMock: Partial<ExerciseTemplatesRefService> = {
  getExerciseTemplatesCollectionRef: () => ({} as AngularFirestoreCollection),
  getExerciseTemplateDocRef: () => ({} as AngularFirestoreDocument)
}
