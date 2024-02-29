import { of } from 'rxjs'
import { ExercisesService } from './exercises.service';

export const exercisesServiceMock: Partial<ExercisesService> = {
  getExercise: () => of({} as any),
  getExercises: () => of({} as any),
  setExercises: () => of({} as any),
  updateExercise: () => of({} as any),
  deleteExercise: () => of(true),
}
