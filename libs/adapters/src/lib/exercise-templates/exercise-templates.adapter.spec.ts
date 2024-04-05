import { ExerciseTemplate, ExerciseTemplateDto, MusclesInvolved } from "@workout-tracker/models";
import { Timestamp } from 'firebase/firestore';
import { ExerciseTemplateAdapter } from "./exercise-templates.adapter";

describe('ExerciseTemplateAdapter', () => {    
  describe('toDto', () => {
    const creationDateSut: Date = new Date()
    const inputExerciseTemplateCreationDateSut: Timestamp = Timestamp.fromDate(creationDateSut)

    it('should convert not modified ExerciseTemplate model into ExerciseTemplateDto model', () => {
      const inputExerciseTemplateIdSut: string = 'exerciseTemplateIdTest'
      const inputExerciseTemplateSut: ExerciseTemplateDto = {
        name: 'exerciseTemplateNameTest',
        musclesInvolved: [ MusclesInvolved.Abductors, MusclesInvolved.Biceps ],
        image: undefined,
        creationDate: inputExerciseTemplateCreationDateSut,
        observations: 'observations',
        lastModification: undefined
      }

      const exerciseTemplateDto = ExerciseTemplateAdapter.toState(inputExerciseTemplateSut, inputExerciseTemplateIdSut)

      expect(exerciseTemplateDto.id).toEqual(inputExerciseTemplateIdSut)
      expect(exerciseTemplateDto.name).toEqual(inputExerciseTemplateSut.name)
      expect(exerciseTemplateDto.musclesInvolved).toEqual(inputExerciseTemplateSut.musclesInvolved)
      expect(exerciseTemplateDto.image).toEqual(inputExerciseTemplateSut.image)
      expect(exerciseTemplateDto.observations).toEqual(inputExerciseTemplateSut.observations)
      expect(exerciseTemplateDto.creationDate).toEqual(creationDateSut)     
      expect(exerciseTemplateDto.lastModification).toEqual(inputExerciseTemplateSut.lastModification)     
    });

    it('should convert modified ExerciseTemplate model into ExerciseTemplateDto model', () => {
      const lastModificationDateSut: Date = new Date()
      const inputExerciseTemplateLastModificationSut: Timestamp = Timestamp.fromDate(lastModificationDateSut)

      const inputExerciseTemplateIdSut: string = 'exerciseTemplateIdTest'
      const inputExerciseTemplateSut: ExerciseTemplateDto = {
        name: 'exerciseTemplateNameTest',
        musclesInvolved: [ MusclesInvolved.Abductors, MusclesInvolved.Biceps ],
        image: undefined,
        creationDate: inputExerciseTemplateCreationDateSut,
        lastModification: inputExerciseTemplateLastModificationSut
      }

      const exerciseTemplateDto = ExerciseTemplateAdapter.toState(inputExerciseTemplateSut, inputExerciseTemplateIdSut)

      expect(exerciseTemplateDto.id).toEqual(inputExerciseTemplateIdSut)
      expect(exerciseTemplateDto.name).toEqual(inputExerciseTemplateSut.name)
      expect(exerciseTemplateDto.musclesInvolved).toEqual(inputExerciseTemplateSut.musclesInvolved)
      expect(exerciseTemplateDto.image).toEqual(inputExerciseTemplateSut.image)
      expect(exerciseTemplateDto.creationDate).toEqual(creationDateSut)     
      expect(exerciseTemplateDto.lastModification).toEqual(lastModificationDateSut)     
    });
  })

  describe('toState', () => {
    const creationDateSut: Date = new Date()
    const inputExerciseTemplateCreationDateSut: Timestamp = Timestamp.fromDate(creationDateSut)
    it('should convert not modified ExerciseTemplateDto model into ExerciseTemplate model', () => {
      const inputExerciseTemplateSut: ExerciseTemplate = {
        id: 'exerciseTemplateIdTest',
        name: 'exerciseTemplateNameTest',
        musclesInvolved: [MusclesInvolved.Abdominals],
        image: undefined,
        creationDate: creationDateSut,
        observations: 'observations2',
        lastModification: undefined
      }

      const exerciseTemplateState = ExerciseTemplateAdapter.toDto(inputExerciseTemplateSut)

      expect(exerciseTemplateState.name).toEqual(inputExerciseTemplateSut.name)
      expect(exerciseTemplateState.musclesInvolved).toEqual(inputExerciseTemplateSut.musclesInvolved)
      expect(exerciseTemplateState.image).toEqual(inputExerciseTemplateSut.image)
      expect(exerciseTemplateState.observations).toEqual(inputExerciseTemplateSut.observations)
      expect(exerciseTemplateState.creationDate).toEqual(inputExerciseTemplateCreationDateSut)  
      expect(exerciseTemplateState.lastModification).toEqual(inputExerciseTemplateSut.lastModification)    
    });

    it('should convert modified ExerciseTemplateDto model into ExerciseTemplate model', () => {
      const modifiedDateSut: Date = new Date()
      const inputExerciseTemplateModifiedDateSut: Timestamp = Timestamp.fromDate(modifiedDateSut)
      
      const inputExerciseTemplateSut: ExerciseTemplate = {
        id: 'exerciseTemplateIdTest',
        name: 'exerciseTemplateNameTest',
        musclesInvolved: [MusclesInvolved.Abdominals],
        image: undefined,
        creationDate: creationDateSut,
        lastModification: modifiedDateSut
      }

      const exerciseTemplateState = ExerciseTemplateAdapter.toDto(inputExerciseTemplateSut)

      expect(exerciseTemplateState.name).toEqual(inputExerciseTemplateSut.name)
      expect(exerciseTemplateState.musclesInvolved).toEqual(inputExerciseTemplateSut.musclesInvolved)
      expect(exerciseTemplateState.image).toEqual(inputExerciseTemplateSut.image)
      expect(exerciseTemplateState.creationDate).toEqual(inputExerciseTemplateCreationDateSut)  
      expect(exerciseTemplateState.lastModification).toEqual(inputExerciseTemplateModifiedDateSut)    
    });
  })
});