import { Exercise, Training, TrainingDto, TrainingExercise, TrainingExerciseDto, TrainingExerciseSerie, TrainingExerciseSerieDto } from "@workout-tracker/models";
import { Timestamp } from 'firebase/firestore';
import { TrainingAdapter, TrainingExerciseAdapter, TrainingExerciseSerieAdapter } from "./training.adapter";
import { DocumentReference } from "@angular/fire/compat/firestore";

describe('TrainingAdapter', () => {    
  describe('toState', () => {
    const creationDateSut: Date = new Date()
    const inputTrainingCreationDateSut: Timestamp = Timestamp.fromDate(creationDateSut)

    it('should convert not finished Training model into TrainingDto model', () => {
      const inputTrainingIdSut = 'trainingIdTest';
      const inputTrainingSut: TrainingDto = {
        observations: 'trainingObservationTest',
        creationDate: inputTrainingCreationDateSut,
        finishDate: undefined
      }
      const inputTrainingExercisesSut: TrainingExercise[] = []

      const trainingState = TrainingAdapter.toState(inputTrainingSut, inputTrainingIdSut, inputTrainingExercisesSut)

      expect(trainingState.id).toEqual(inputTrainingIdSut)
      expect(trainingState.observations).toEqual(inputTrainingSut.observations)
      expect(trainingState.trainingExercises).toEqual(inputTrainingExercisesSut)
      expect(trainingState.creationDate).toEqual(creationDateSut)     
      expect(trainingState.finishDate).toEqual(inputTrainingSut.finishDate)     
    });

    it('should convert finished Training model into TrainingDto model', () => {
      const finishDateDateSut: Date = new Date()
      const inputTrainingFinishDateSut: Timestamp = Timestamp.fromDate(finishDateDateSut)

      const inputTrainingIdSut = 'trainingIdTest';
      const inputTrainingSut: TrainingDto = {
        observations: 'trainingObservationTest',
        creationDate: inputTrainingCreationDateSut,
        finishDate: inputTrainingFinishDateSut
      }
      const inputTrainingExercisesSut: TrainingExercise[] = []

      const trainingState = TrainingAdapter.toState(inputTrainingSut, inputTrainingIdSut, inputTrainingExercisesSut)

      expect(trainingState.id).toEqual(inputTrainingIdSut)
      expect(trainingState.observations).toEqual(inputTrainingSut.observations)
      expect(trainingState.trainingExercises).toEqual(inputTrainingExercisesSut)
      expect(trainingState.creationDate).toEqual(creationDateSut)     
      expect(trainingState.finishDate).toEqual(finishDateDateSut)      
    });
  })

  describe('toState', () => {
    const creationDateSut: Date = new Date()
    const inputTrainingCreationDateSut: Timestamp = Timestamp.fromDate(creationDateSut)
    it('should convert not finished Training model into TrainingDto model', () => {
      const inputTrainingSut: Training = {
        id: 'trainingIdTest',
        creationDate: creationDateSut,
        trainingExercises: [],
        observations: 'observations2',
        finishDate: undefined
      }

      const trainingDto = TrainingAdapter.toDto(inputTrainingSut)

      expect(trainingDto.observations).toEqual(inputTrainingSut.observations)
      expect(trainingDto.creationDate).toEqual(inputTrainingCreationDateSut)  
      expect(trainingDto.finishDate).toEqual(inputTrainingSut.finishDate)    
    });

    it('should convert finished Training model into TrainingDto model', () => {
      const modifiedDateSut: Date = new Date()
      const inputTrainingModifiedDateSut: Timestamp = Timestamp.fromDate(modifiedDateSut)
      
      const inputTrainingSut: Training = {
        id: 'trainingIdTest',
        creationDate: creationDateSut,
        trainingExercises: [],
        observations: 'observations2',
        finishDate: modifiedDateSut
      }

      const trainingDto = TrainingAdapter.toDto(inputTrainingSut)

      expect(trainingDto.observations).toEqual(inputTrainingSut.observations)
      expect(trainingDto.creationDate).toEqual(inputTrainingCreationDateSut)  
      expect(trainingDto.finishDate).toEqual(inputTrainingModifiedDateSut)      
    });
  })
});

describe('TrainingExerciseAdapter', () => {    
  describe('toState', () => {
    it('should convert TrainingExercise model into TrainingExerciseDto model', () => {
      const inputTrainingExerciseIdSut = 'trainingExerciseIdTest';
      const inputTrainingExerciseSut: TrainingExerciseDto = {
        exerciseTemplateId: {} as DocumentReference
      }
      const inputExerciseTemplateSut: Exercise = {} as Exercise
      const inputTrainingExerciseSeriesSut: TrainingExerciseSerie[] = []

      const trainingExerciseState = TrainingExerciseAdapter.toState(inputTrainingExerciseSut, inputTrainingExerciseIdSut, inputExerciseTemplateSut, inputTrainingExerciseSeriesSut)

      expect(trainingExerciseState.id).toEqual(inputTrainingExerciseIdSut)
      expect(trainingExerciseState.exerciseTemplate).toEqual(inputExerciseTemplateSut)
      expect(trainingExerciseState.series).toEqual(inputTrainingExerciseSeriesSut)  
    });
  })

  describe('toDto', () => {
    it('should convert TrainingExercise model into TrainingExerciseDto model', () => {
      const inputTrainingExerciseSut: TrainingExercise = {
        id: 'trainingExerciseIdTest',
        exerciseTemplate: {} as Exercise,
        series: []
      }
      const inputTrainingExerciseTemplateSut = {} as DocumentReference

      const trainingExerciseDto = TrainingExerciseAdapter.toDto(inputTrainingExerciseSut, inputTrainingExerciseTemplateSut)

      expect(trainingExerciseDto.exerciseTemplateId).toEqual(inputTrainingExerciseTemplateSut)  
    });
  })
});

describe('TrainingExerciseSerieAdapter', () => {    
  describe('toState', () => {
    it('should convert TrainingExerciseSerie model into TrainingExerciseSerieDto model', () => {
      const inputTrainingExerciseSerieIdSut = 'trainingExerciseSerieIdTest';
      const inputTrainingExerciseSerieSut: TrainingExerciseSerieDto = {
        weight: 10,
        repetitions: 20,
        observations: 'observations'
      }

      const trainingExerciseSerieState = TrainingExerciseSerieAdapter.toState(inputTrainingExerciseSerieSut, inputTrainingExerciseSerieIdSut)

      expect(trainingExerciseSerieState.id).toEqual(inputTrainingExerciseSerieIdSut)
      expect(trainingExerciseSerieState.weight).toEqual(inputTrainingExerciseSerieSut.weight)
      expect(trainingExerciseSerieState.repetitions).toEqual(inputTrainingExerciseSerieSut.repetitions)
      expect(trainingExerciseSerieState.observations).toEqual(inputTrainingExerciseSerieSut.observations)
    });
  })

  describe('toDto', () => {
    it('should convert TrainingExerciseSerie model into TrainingExerciseSerieDto model', () => {
      const inputTrainingExerciseSerieSut: TrainingExerciseSerie = {
        id: 'trainingExerciseSerieIdTest',
        weight: 10,
        repetitions: 290,
        observations: undefined
      }

      const trainingExerciseSerieDto = TrainingExerciseSerieAdapter.toDto(inputTrainingExerciseSerieSut)

      expect(trainingExerciseSerieDto.weight).toEqual(inputTrainingExerciseSerieSut.weight)
      expect(trainingExerciseSerieDto.repetitions).toEqual(inputTrainingExerciseSerieSut.repetitions)
      expect(trainingExerciseSerieDto.observations).toEqual(inputTrainingExerciseSerieSut.observations)
    });
  })
});