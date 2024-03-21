import { of } from 'rxjs'
import { ExercisesService } from './exercises.service';
import { AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Exercise } from '@workout-tracker/models';

export const exercisesServiceMock: Partial<ExercisesService> = {
  getExerciseDocRef: () => { return {} as AngularFirestoreDocument},
  getExercise: () => of({} as Exercise),
  getExercises: () => of([] as Exercise[]),
  setExercises: () => of({} as Exercise),
  updateExercise: () => of({} as Exercise),
  deleteExercise: () => of(true),
}
