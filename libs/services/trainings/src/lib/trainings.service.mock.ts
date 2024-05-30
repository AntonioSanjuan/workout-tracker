import { of } from 'rxjs'
import { TrainingsService } from './trainings.service';
import { Training, TrainingExercise, TrainingExerciseSerie } from '@workout-tracker/models';

export const trainingsServiceMock: Partial<TrainingsService> = {
  getTraining: () => of({} as Training),
  getTrainings: () => of([] as Training[]),
  getTrainingExercise: () => of({} as TrainingExercise),
  getExerciseTemplateTrainings: () => of([] as Training[]),
  getPrevTrainingExercisesByExerciseTemplate: () => of([] as TrainingExercise[]),
  setTraining: () => of({} as Training),
  copyTraining: () => of({} as Training),
  setTrainingExercise: () => of({} as TrainingExercise),
  setTrainingExerciseSerie: () => of({} as TrainingExerciseSerie),
  updateTraining: () => of({} as Training),
  updateTrainingExercise: () => of({} as TrainingExercise),
  updateTrainingExerciseSerie: () => of({} as TrainingExerciseSerie),
  deleteTraining: () => of(true),  
  deleteTrainingExercise: () => of(true),  
  deleteTrainingExerciseSerie: () => of(true),
}
