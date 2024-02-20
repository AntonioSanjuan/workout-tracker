import { of } from 'rxjs'
import { ExercisesService } from './exercises.service';

export const exercisesServiceMock: Partial<ExercisesService> = {
  getExercises: () => of({} as any),
  setExercises: () => of({} as any),
  updateExercises: () => of({} as any),
  deleteExercise: () => of(true),
}
