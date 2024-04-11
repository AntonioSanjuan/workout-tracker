import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { ExerciseTemplatesService } from './exercise-templates.service';
import { TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import firebase from 'firebase/compat/app/';
import { ExerciseTemplate } from '@workout-tracker/models';
import { ExerciseTemplateAdapter } from '@workout-tracker/adapters';
import { ExerciseTemplatesRefService } from './exercise-templates-ref.service';
import { exerciseTemplatesRefServiceMock } from './exercise-templates-ref.service.mock';

describe('ExerciseTemplatesService', () => {
  let service: ExerciseTemplatesService;
  let exerciseTemplatesRefService: ExerciseTemplatesRefService;
  let store: Store;
  let translateService: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      providers: [
        { provide: ExerciseTemplatesRefService, useValue: exerciseTemplatesRefServiceMock },
        ExerciseTemplatesService,
        provideMockStore({
          initialState: {}
        })
      ]
    });
    service = TestBed.inject(ExerciseTemplatesService);
    exerciseTemplatesRefService = TestBed.inject(ExerciseTemplatesRefService)
    store = TestBed.inject(Store)
    translateService = TestBed.inject(TranslateService);

  });

  describe('Unit tests', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  })
  describe('Integration tests', () => {

    describe('getExerciseTemplates', () => {
      const userIdSut = 'asd'

      const storedExercises = [
        {
          name: 'exercise test name 0',
          creationDate: new Date()
        } as ExerciseTemplate,
        {
          name: 'exercise test name 1',
          creationDate: new Date()
        } as ExerciseTemplate,
        {
          name: 'exercise test name 2',
          creationDate: new Date()
        } as ExerciseTemplate
      ]

      beforeEach(() => {
        jest.spyOn(exerciseTemplatesRefService, 'getExerciseTemplatesCollectionRef').mockReturnValue({
          get: jest.fn().mockReturnValue(of(
            {
              docs: storedExercises.map((exercise: ExerciseTemplate) => {
                return {
                  data: jest.fn().mockReturnValue(ExerciseTemplateAdapter.toDto(exercise))
                }
              })
            }
          ))        
        } as any)
      })

      it('getExerciseTemplates should return exercises stored into Firebase collection',  (done) => {
        service.getExerciseTemplates(userIdSut).subscribe((exercises) => {
          expect(exercises).toEqual(storedExercises)
          done()
        })
      })
    });

    describe('getExerciseTemplate', () => {
      const userIdSut = 'userId test'
      const exerciseIdSut = 'exerciseId test'

      const exerciseSample = {
        name: 'exercise test name 0',
        creationDate: new Date()
      } as ExerciseTemplate
      const exerciseDtoSut = ExerciseTemplateAdapter.toDto(exerciseSample)


      beforeEach(() => {
        jest.spyOn(exerciseTemplatesRefService, 'getExerciseTemplateDocRef').mockReturnValue({
          get: jest.fn().mockReturnValue(of(
            {
              id: exerciseIdSut,
              data: jest.fn().mockReturnValue(exerciseDtoSut)
            }
          ))
        } as any)
      })

      it('getExerciseTemplate should return exercise stored into Firebase collection',  (done) => {
        service.getExerciseTemplate(userIdSut, exerciseIdSut).subscribe((exercise) => {
          expect(exercise).toEqual(ExerciseTemplateAdapter.toState(exerciseDtoSut, exerciseIdSut))
          done()
        })
      })
    });

    describe('setExerciseTemplate', () => {
      const userIdSut = 'asd'

      const exerciseSut = {
        name: 'exercise test name 0',
        creationDate: new Date()
      } as ExerciseTemplate;
        
      const addSpy = jest.fn()
      beforeEach(() => {
        addSpy.mockReset()
        jest.spyOn(exerciseTemplatesRefService, 'getExerciseTemplatesCollectionRef').mockReturnValue({
          add: addSpy.mockResolvedValue(ExerciseTemplateAdapter.toDto(exerciseSut))
        } as any)
      })

      it('setExerciseTemplate should request collection add',  (done) => {
        service.setExerciseTemplate(userIdSut, exerciseSut).subscribe(() => {
          expect(addSpy).toHaveBeenCalledWith(ExerciseTemplateAdapter.toDto(exerciseSut))
          done()
        })
      })

      it('setExerciseTemplate should return exercise',  (done) => {
        service.setExerciseTemplate(userIdSut, exerciseSut).subscribe((exercises) => {
          expect(exercises).toEqual(exerciseSut)
          done()
        })
      })
    });

    describe('updateExercises', () => {
      const userIdSut = 'asd'

      const exerciseSut = {
        name: 'exercise test name 0',
        creationDate: new Date()
      } as ExerciseTemplate;
        
      const updateSpy = jest.fn()
      beforeEach(() => {
        updateSpy.mockReset()
        jest.spyOn(exerciseTemplatesRefService, 'getExerciseTemplateDocRef').mockReturnValue({
          update: updateSpy.mockResolvedValue(ExerciseTemplateAdapter.toDto(exerciseSut))
        } as any)
      })

      it('updateExercises should request doc update',  (done) => {
        service.updateExerciseTemplate(userIdSut, exerciseSut).subscribe(() => {
          expect(updateSpy).toHaveBeenCalledWith(ExerciseTemplateAdapter.toDto(exerciseSut))
          done()
        })
      })

      it('updateExercises should return exercise',  (done) => {
        service.updateExerciseTemplate(userIdSut, exerciseSut).subscribe((exercises) => {
          expect(exercises).toEqual(exerciseSut)
          done()
        })
      })
    });

    describe('deleteExerciseTemplate', () => {
      const userIdSut = 'asd'

      const exerciseSut = {
        name: 'exercise test name 0'
      } as ExerciseTemplate;
        
      const deleteExerciseSpy = jest.fn()
      beforeEach(() => {
        deleteExerciseSpy.mockReset()
        jest.spyOn(exerciseTemplatesRefService, 'getExerciseTemplateDocRef').mockReturnValue({
          delete: deleteExerciseSpy.mockResolvedValue(true)
        } as any)
      })

      it('deleteExerciseTemplate should request doc update',  (done) => {
        service.deleteExerciseTemplate(userIdSut, exerciseSut).subscribe(() => {
          expect(deleteExerciseSpy).toHaveBeenCalled()
          done()
        })
      })
    });
  })
})
