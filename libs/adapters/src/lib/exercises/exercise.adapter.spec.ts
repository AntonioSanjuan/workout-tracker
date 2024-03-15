import { Exercise, ExerciseDto, MusclesInvolved } from "@workout-tracker/models";
import { Timestamp } from 'firebase/firestore';
import { ExerciseAdapter } from "./exercise.adapter";

describe('ExerciseAdapter', () => {    
  describe('toDto', () => {
    const creationDateSut: Date = new Date()
    const inputExerciseCreationDateSut: Timestamp = Timestamp.fromDate(creationDateSut)

    it('should convert not modified Exercise model into ExerciseDto model', () => {
      const inputExerciseIdSut: string = 'exerciseIdTest'
      const inputExerciseSut: ExerciseDto = {
        name: 'exerciseNameTest',
        musclesInvolved: [ MusclesInvolved.Abductors, MusclesInvolved.Biceps ],
        image: undefined,
        creationDate: inputExerciseCreationDateSut,
        observations: 'observations',
        lastModification: undefined
      }

      const exerciseDto = ExerciseAdapter.toState(inputExerciseSut, inputExerciseIdSut)

      expect(exerciseDto.id).toEqual(inputExerciseIdSut)
      expect(exerciseDto.name).toEqual(inputExerciseSut.name)
      expect(exerciseDto.musclesInvolved).toEqual(inputExerciseSut.musclesInvolved)
      expect(exerciseDto.image).toEqual(inputExerciseSut.image)
      expect(exerciseDto.observations).toEqual(inputExerciseSut.observations)
      expect(exerciseDto.creationDate).toEqual(creationDateSut)     
      expect(exerciseDto.lastModification).toEqual(inputExerciseSut.lastModification)     
    });

    it('should convert modified Exercise model into ExerciseDto model', () => {
      const lastModificationDateSut: Date = new Date()
      const inputExerciseLastModificationSut: Timestamp = Timestamp.fromDate(lastModificationDateSut)

      const inputExerciseIdSut: string = 'exerciseIdTest'
      const inputExerciseSut: ExerciseDto = {
        name: 'exerciseNameTest',
        musclesInvolved: [ MusclesInvolved.Abductors, MusclesInvolved.Biceps ],
        image: undefined,
        creationDate: inputExerciseCreationDateSut,
        lastModification: inputExerciseLastModificationSut
      }

      const exerciseDto = ExerciseAdapter.toState(inputExerciseSut, inputExerciseIdSut)

      expect(exerciseDto.id).toEqual(inputExerciseIdSut)
      expect(exerciseDto.name).toEqual(inputExerciseSut.name)
      expect(exerciseDto.musclesInvolved).toEqual(inputExerciseSut.musclesInvolved)
      expect(exerciseDto.image).toEqual(inputExerciseSut.image)
      expect(exerciseDto.creationDate).toEqual(creationDateSut)     
      expect(exerciseDto.lastModification).toEqual(lastModificationDateSut)     
    });
  })

  describe('toState', () => {
    const creationDateSut: Date = new Date()
    const inputExerciseCreationDateSut: Timestamp = Timestamp.fromDate(creationDateSut)
    it('should convert not modified ExerciseDto model into Exercise model', () => {
      const inputExerciseSut: Exercise = {
        id: 'exerciseIdTest',
        name: 'exerciseNameTest',
        musclesInvolved: [MusclesInvolved.Abdominals],
        image: undefined,
        creationDate: creationDateSut,
        observations: 'observations2',
        lastModification: undefined
      }

      const exerciseState = ExerciseAdapter.toDto(inputExerciseSut)

      expect(exerciseState.name).toEqual(inputExerciseSut.name)
      expect(exerciseState.musclesInvolved).toEqual(inputExerciseSut.musclesInvolved)
      expect(exerciseState.image).toEqual(inputExerciseSut.image)
      expect(exerciseState.observations).toEqual(inputExerciseSut.observations)
      expect(exerciseState.creationDate).toEqual(inputExerciseCreationDateSut)  
      expect(exerciseState.lastModification).toEqual(inputExerciseSut.lastModification)    
    });

    it('should convert modified ExerciseDto model into Exercise model', () => {
      const modifiedDateSut: Date = new Date()
      const inputExerciseModifiedDateSut: Timestamp = Timestamp.fromDate(modifiedDateSut)
      
      const inputExerciseSut: Exercise = {
        id: 'exerciseIdTest',
        name: 'exerciseNameTest',
        musclesInvolved: [MusclesInvolved.Abdominals],
        image: undefined,
        creationDate: creationDateSut,
        lastModification: modifiedDateSut
      }

      const exerciseState = ExerciseAdapter.toDto(inputExerciseSut)

      expect(exerciseState.name).toEqual(inputExerciseSut.name)
      expect(exerciseState.musclesInvolved).toEqual(inputExerciseSut.musclesInvolved)
      expect(exerciseState.image).toEqual(inputExerciseSut.image)
      expect(exerciseState.creationDate).toEqual(inputExerciseCreationDateSut)  
      expect(exerciseState.lastModification).toEqual(inputExerciseModifiedDateSut)    
    });
  })
});