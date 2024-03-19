import { of } from 'rxjs'
import { TrainingsService } from './trainings.service';

export const trainingsServiceMock: Partial<TrainingsService> = {
  getTraining: () => of({} as any),
  getTrainings: () => of({} as any),
  setTrainings: () => of({} as any),
  updateTraining: () => of({} as any),
  deleteTraining: () => of(true),
}
