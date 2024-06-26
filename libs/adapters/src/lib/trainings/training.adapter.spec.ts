import { CardiovascularTypeData, ExerciseTemplate, MuscleGroups, StrengthTypeData, Training, TrainingDto, TrainingExercise, TrainingExerciseDto, TrainingExerciseSerie, TrainingExerciseSerieDto } from "@workout-tracker/models";
import { Timestamp } from 'firebase/firestore';
import { TrainingAdapter, TrainingExerciseAdapter, TrainingExerciseSerieAdapter } from "./training.adapter";
import { DocumentReference } from "@angular/fire/compat/firestore";

describe('TrainingAdapter', () => {    
  describe('toState', () => {
    const creationDateSut: Date = new Date()
    const inputTrainingCreationDateSut: Timestamp = Timestamp.fromDate(creationDateSut)

    it('should convert not finished Training model into TrainingDto model', () => {
      const inputTrainingIdSut = 'trainingIdTest';
      const muscleGroupsSut = [ MuscleGroups.Core ];

      const inputTrainingSut: TrainingDto = {
        muscleGroups: muscleGroupsSut,
        observations: 'trainingObservationTest',
        creationDate: inputTrainingCreationDateSut,
        finishDate: undefined
      }
      const inputTrainingExercisesSut: TrainingExercise[] = []

      const trainingState = TrainingAdapter.toState(inputTrainingSut, inputTrainingIdSut, inputTrainingExercisesSut)

      expect(trainingState.id).toEqual(inputTrainingIdSut)
      expect(trainingState.muscleGroups).toEqual(muscleGroupsSut)
      expect(trainingState.observations).toEqual(inputTrainingSut.observations)
      expect(trainingState.trainingExercises).toEqual(inputTrainingExercisesSut)
      expect(trainingState.creationDate).toEqual(creationDateSut)     
      expect(trainingState.finishDate).toEqual(inputTrainingSut.finishDate)     
    });

    it('should convert finished Training model into TrainingDto model', () => {
      const finishDateDateSut: Date = new Date()
      const inputTrainingFinishDateSut: Timestamp = Timestamp.fromDate(finishDateDateSut)
      const muscleGroupsSut = [ MuscleGroups.Arms]
      const inputTrainingIdSut = 'trainingIdTest';
      const inputTrainingSut: TrainingDto = {
        muscleGroups: muscleGroupsSut,
        observations: 'trainingObservationTest',
        creationDate: inputTrainingCreationDateSut,
        finishDate: inputTrainingFinishDateSut
      }
      const inputTrainingExercisesSut: TrainingExercise[] = []

      const trainingState = TrainingAdapter.toState(inputTrainingSut, inputTrainingIdSut, inputTrainingExercisesSut)

      expect(trainingState.id).toEqual(inputTrainingIdSut)
      expect(trainingState.observations).toEqual(inputTrainingSut.observations)
      expect(trainingState.muscleGroups).toEqual(muscleGroupsSut)
      expect(trainingState.trainingExercises).toEqual(inputTrainingExercisesSut)
      expect(trainingState.creationDate).toEqual(creationDateSut)     
      expect(trainingState.finishDate).toEqual(finishDateDateSut)      
    });
  })

  describe('toState', () => {
    const creationDateSut: Date = new Date()
    const inputTrainingCreationDateSut: Timestamp = Timestamp.fromDate(creationDateSut)
    it('should convert not finished Training model into TrainingDto model', () => {
      const muscleGroupsSut = [ MuscleGroups.Chest ]
      const inputTrainingSut: Training = {
        id: 'trainingIdTest',
        creationDate: creationDateSut,
        muscleGroups: muscleGroupsSut,
        trainingExercises: [],
        observations: 'observations2',
        finishDate: undefined
      }

      const trainingDto = TrainingAdapter.toDto(inputTrainingSut)

      expect(trainingDto.muscleGroups).toEqual(muscleGroupsSut)
      expect(trainingDto.observations).toEqual(inputTrainingSut.observations)
      expect(trainingDto.creationDate).toEqual(inputTrainingCreationDateSut)  
      expect(trainingDto.finishDate).toEqual(inputTrainingSut.finishDate)    
    });

    it('should convert finished Training model into TrainingDto model', () => {
      const modifiedDateSut: Date = new Date()
      const inputTrainingModifiedDateSut: Timestamp = Timestamp.fromDate(modifiedDateSut)
      const muscleGroupsSut = [] as MuscleGroups[]
      const inputTrainingSut: Training = {
        id: 'trainingIdTest',
        creationDate: creationDateSut,
        muscleGroups: muscleGroupsSut,
        trainingExercises: [],
        observations: 'observations2',
        finishDate: modifiedDateSut
      }

      const trainingDto = TrainingAdapter.toDto(inputTrainingSut)

      expect(trainingDto.observations).toEqual(inputTrainingSut.observations)
      expect(trainingDto.muscleGroups).toEqual(muscleGroupsSut)
      expect(trainingDto.creationDate).toEqual(inputTrainingCreationDateSut)  
      expect(trainingDto.finishDate).toEqual(inputTrainingModifiedDateSut)      
    });
  })
});

describe('TrainingExerciseAdapter', () => {    
  describe('toState', () => {
    const creationDateSut: Date = new Date()
    const inputTrainingCreationDateSut: Timestamp = Timestamp.fromDate(creationDateSut)


    it('should convert TrainingExercise model into TrainingExerciseDto model', () => {
      const inputTrainingExerciseIdSut = 'trainingExerciseIdTest';
      const inputTrainingExerciseSut: TrainingExerciseDto = {
        exerciseTemplateId: {} as DocumentReference,
        creationDate: inputTrainingCreationDateSut
      }
      const inputExerciseTemplateSut: ExerciseTemplate = {} as ExerciseTemplate
      const inputTrainingExerciseSeriesSut: TrainingExerciseSerie[] = []

      const trainingExerciseState = TrainingExerciseAdapter.toState(inputTrainingExerciseSut, inputTrainingExerciseIdSut, inputExerciseTemplateSut, inputTrainingExerciseSeriesSut)

      expect(trainingExerciseState.id).toEqual(inputTrainingExerciseIdSut)
      expect(trainingExerciseState.exerciseTemplate).toEqual(inputExerciseTemplateSut)
      expect(trainingExerciseState.series).toEqual(inputTrainingExerciseSeriesSut)  
      expect(trainingExerciseState.creationDate).toEqual(creationDateSut)  
    });
  })

  describe('toDto', () => {
    const creationDateSut: Date = new Date()
    const inputTrainingCreationDateSut: Timestamp = Timestamp.fromDate(creationDateSut)
    it('should convert TrainingExercise model into TrainingExerciseDto model', () => {
      const inputTrainingExerciseSut: TrainingExercise = {
        id: 'trainingExerciseIdTest',
        exerciseTemplate: {} as ExerciseTemplate,
        series: [],
        creationDate: creationDateSut
      }
      const inputTrainingExerciseTemplateSut = {} as DocumentReference

      const trainingExerciseDto = TrainingExerciseAdapter.toDto(inputTrainingExerciseSut, inputTrainingExerciseTemplateSut)

      expect(trainingExerciseDto.exerciseTemplateId).toEqual(inputTrainingExerciseTemplateSut)  
      expect(trainingExerciseDto.creationDate).toEqual(inputTrainingCreationDateSut)  
    });
  })
});

describe('TrainingExerciseSerieAdapter', () => {    
  describe('toState', () => {
    const creationDateSut: Date = new Date()
    const inputTrainingCreationDateSut: Timestamp = Timestamp.fromDate(creationDateSut)

    describe('with StrengthTypeData data', () => {
      it('should convert TrainingExerciseSerie model into TrainingExerciseSerieDto model', () => {
        const inputTrainingExerciseSerieIdSut = 'trainingExerciseSerieIdTest';
        const inputTrainingExerciseSerieSut: TrainingExerciseSerieDto = {
          data: {
            weight: 10,
            repetitions: 20,
          },
          observations: 'observations',
          creationDate: inputTrainingCreationDateSut
        }
  
        const trainingExerciseSerieState = TrainingExerciseSerieAdapter.toState(inputTrainingExerciseSerieSut, inputTrainingExerciseSerieIdSut)
  
        expect(trainingExerciseSerieState.id).toEqual(inputTrainingExerciseSerieIdSut)
        expect((trainingExerciseSerieState.data as StrengthTypeData).weight).toEqual((inputTrainingExerciseSerieSut.data as StrengthTypeData).weight)
        expect((trainingExerciseSerieState.data as StrengthTypeData).repetitions).toEqual((inputTrainingExerciseSerieSut.data as StrengthTypeData).repetitions)
        expect(trainingExerciseSerieState.observations).toEqual(inputTrainingExerciseSerieSut.observations)
        expect(trainingExerciseSerieState.creationDate).toEqual(creationDateSut)
      });
    })
    describe('with CardiovascularTypeData data', () => {
      
      it('should convert TrainingExerciseSerie model into TrainingExerciseSerieDto model', () => {
        const inputTrainingExerciseSerieIdSut = 'trainingExerciseSerieIdTest';
        const inputTrainingExerciseSerieSut: TrainingExerciseSerieDto = {
          data: {
            speed: 13.5,
            duration: 17,
          },
          observations: 'observations',
          creationDate: inputTrainingCreationDateSut
        }
  
        const trainingExerciseSerieState = TrainingExerciseSerieAdapter.toState(inputTrainingExerciseSerieSut, inputTrainingExerciseSerieIdSut)
  
        expect(trainingExerciseSerieState.id).toEqual(inputTrainingExerciseSerieIdSut)
        expect((trainingExerciseSerieState.data as CardiovascularTypeData).speed).toEqual((inputTrainingExerciseSerieSut.data as CardiovascularTypeData).speed)
        expect((trainingExerciseSerieState.data as CardiovascularTypeData).duration).toEqual((inputTrainingExerciseSerieSut.data as CardiovascularTypeData).duration)
        expect(trainingExerciseSerieState.observations).toEqual(inputTrainingExerciseSerieSut.observations)
        expect(trainingExerciseSerieState.creationDate).toEqual(creationDateSut)
      });
    })

  })

  describe('toDto', () => {
    const creationDateSut: Date = new Date()
    const inputTrainingCreationDateSut: Timestamp = Timestamp.fromDate(creationDateSut)

    describe('with StrengthTypeData data', () => {
      it('should convert TrainingExerciseSerie model into TrainingExerciseSerieDto model', () => {
        const inputTrainingExerciseSerieSut: TrainingExerciseSerie = {
          id: 'trainingExerciseSerieIdTest',
          data: {
            weight: 10,
            repetitions: 20,
          },
          observations: undefined,
          creationDate: creationDateSut
        }
  
        const trainingExerciseSerieDto = TrainingExerciseSerieAdapter.toDto(inputTrainingExerciseSerieSut)
  
        expect((trainingExerciseSerieDto.data as StrengthTypeData).weight).toEqual((inputTrainingExerciseSerieSut.data as StrengthTypeData).weight)
        expect((trainingExerciseSerieDto.data as StrengthTypeData).repetitions).toEqual((inputTrainingExerciseSerieSut.data as StrengthTypeData).repetitions)
        expect(trainingExerciseSerieDto.observations).toEqual(inputTrainingExerciseSerieSut.observations)
        expect(trainingExerciseSerieDto.creationDate).toEqual(inputTrainingCreationDateSut)
      });
    })
    describe('with CardiovascularTypeData data', () => {
      it('should convert TrainingExerciseSerie model into TrainingExerciseSerieDto model', () => {
        const inputTrainingExerciseSerieSut: TrainingExerciseSerie = {
          id: 'trainingExerciseSerieIdTest',
          data: {
            speed: 13.6,
            duration: 12,
          },
          observations: undefined,
          creationDate: creationDateSut
        }
  
        const trainingExerciseSerieDto = TrainingExerciseSerieAdapter.toDto(inputTrainingExerciseSerieSut)
  
        expect((trainingExerciseSerieDto.data as CardiovascularTypeData).speed).toEqual((inputTrainingExerciseSerieSut.data as CardiovascularTypeData).speed)
        expect((trainingExerciseSerieDto.data as CardiovascularTypeData).duration).toEqual((inputTrainingExerciseSerieSut.data as CardiovascularTypeData).duration)
        expect(trainingExerciseSerieDto.observations).toEqual(inputTrainingExerciseSerieSut.observations)
        expect(trainingExerciseSerieDto.creationDate).toEqual(inputTrainingCreationDateSut)
      });
    })

  })
});