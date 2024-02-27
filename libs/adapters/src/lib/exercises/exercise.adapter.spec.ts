import { Exercise, ExerciseDto, ExerciseType } from "@workout-tracker/models";
import { Timestamp } from 'firebase/firestore';
import { ExerciseAdapter } from "./exercise.adapter";

describe('ExerciseAdapter', () => {    
    it('toDto should convert Exercise model into ExerciseDto model', () => {
      const createdAtSut: Date = new Date()
      const inputExerciseCreationDateSut: Timestamp = Timestamp.fromDate(createdAtSut)

      const inputExerciseIdSut: string = 'exerciseIdTest'
      const inputExerciseSut: ExerciseDto = {
        name: 'exerciseNameTest',
        types: [ ExerciseType.Arms, ExerciseType.Back ],
        image: undefined,
        creationDate: inputExerciseCreationDateSut,
      }

      const exerciseDto = ExerciseAdapter.toState(inputExerciseSut, inputExerciseIdSut)

      expect(exerciseDto.id).toEqual(inputExerciseIdSut)
      expect(exerciseDto.name).toEqual(inputExerciseSut.name)
      expect(exerciseDto.types).toEqual(inputExerciseSut.types)
      expect(exerciseDto.image).toEqual(inputExerciseSut.image)
      expect(exerciseDto.creationDate).toEqual(createdAtSut)     
    });

    it('toState should convert ExerciseDto model into Exercise model', () => {
      const createdAtSut: Date = new Date()

      const inputExerciseCreationDateSut: Timestamp = Timestamp.fromDate(createdAtSut)

      const inputGameSut: Exercise = {
        id: 'exerciseIdTest',
        name: 'exerciseNameTest',
        types: [ ExerciseType.Arms, ExerciseType.Back ],
        image: undefined,
        creationDate: createdAtSut
      }

      const exerciseState = ExerciseAdapter.toDto(inputGameSut)

      expect(exerciseState.name).toEqual(inputGameSut.name)
      expect(exerciseState.types).toEqual(inputGameSut.types)
      expect(exerciseState.image).toEqual(inputGameSut.image)
      expect(exerciseState.creationDate).toEqual(inputExerciseCreationDateSut)      
    });
});