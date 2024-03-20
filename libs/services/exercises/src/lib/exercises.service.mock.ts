import { of } from 'rxjs'
import { ExercisesService } from './exercises.service';
import { AngularFirestoreDocument } from '@angular/fire/compat/firestore';

export const exercisesServiceMock: Partial<ExercisesService> = {
  getExerciseDocRef: () => { return {} as AngularFirestoreDocument},
  getExercise: () => of({} as any),
  getExercises: () => of({} as any),
  setExercises: () => of({} as any),
  updateExercise: () => of({} as any),
  deleteExercise: () => of(true),
}
