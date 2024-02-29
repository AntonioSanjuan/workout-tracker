import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { ExercisesService } from './exercises.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import firebase from 'firebase/compat/app/';
import { Exercise } from '@workout-tracker/models';
import { ExerciseAdapter } from '@workout-tracker/adapters';

const mock = {
  collection: jest.fn().mockReturnValue({}  as AngularFirestoreCollection<unknown>),
  doc: jest.fn().mockReturnValue({}  as AngularFirestoreDocument<unknown>)
};


describe('ExercisesService', () => {
  let service: ExercisesService;
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
        { provide: AngularFirestore, useValue: mock },
        ExercisesService,
        provideMockStore({
          initialState: {}
        })
      ]
    });
    service = TestBed.inject(ExercisesService);
    store = TestBed.inject(Store)
    translateService = TestBed.inject(TranslateService);

  });

  describe('Unit tests', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  })
  describe('Integration tests', () => {

    describe('getExercises', () => {
      const userIdSut = 'asd'

      const storedExercises = [
        {
          name: 'exercise test name 0',
          creationDate: new Date()
        } as Exercise,
        {
          name: 'exercise test name 1',
          creationDate: new Date()
        } as Exercise,
        {
          name: 'exercise test name 2',
          creationDate: new Date()
        } as Exercise
      ]

      beforeEach(() => {
        mock.collection.mockReturnValue({
          get: jest.fn().mockReturnValue(of(
            {
              docs: storedExercises.map((exercise: Exercise) => {
                return {
                  data: jest.fn().mockReturnValue(ExerciseAdapter.toDto(exercise))
                }
              })
            }
          ))
        })
      })

      it('getExercises should return exercises stored into Firebase collection',  (done) => {
        service.getExercises(userIdSut).subscribe((exercises) => {
          expect(exercises).toEqual(storedExercises)
          done()
        })
      })
    });

    describe('getExercise', () => {
      const userIdSut = 'userId test'
      const exerciseIdSut = 'exerciseId test'

      const exerciseSample = {
        name: 'exercise test name 0',
        creationDate: new Date()
      } as Exercise
      const exerciseDtoSut = ExerciseAdapter.toDto(exerciseSample)


      beforeEach(() => {
        mock.doc.mockReturnValue({
          get: jest.fn().mockReturnValue(of(
            {
              id: exerciseIdSut,
              data: jest.fn().mockReturnValue(exerciseDtoSut)
            }
          ))
        })
      })

      it('getExercise should return exercise stored into Firebase collection',  (done) => {
        service.getExercise(userIdSut, exerciseIdSut).subscribe((exercise) => {
          expect(exercise).toEqual(ExerciseAdapter.toState(exerciseDtoSut, exerciseIdSut))
          done()
        })
      })
    });

    describe('setExercises', () => {
      const userIdSut = 'asd'

      const exerciseSut = {
        name: 'exercise test name 0',
        creationDate: new Date()
      } as Exercise;
        
      const addSpy = jest.fn()
      beforeEach(() => {
        addSpy.mockReset()
        mock.collection.mockReturnValue({
          add: addSpy.mockResolvedValue(ExerciseAdapter.toDto(exerciseSut))
        })
      })

      it('setExercises should request collection add',  (done) => {
        service.setExercises(userIdSut, exerciseSut).subscribe(() => {
          expect(addSpy).toHaveBeenCalledWith(ExerciseAdapter.toDto(exerciseSut))
          done()
        })
      })

      it('setExercises should return exercise',  (done) => {
        service.setExercises(userIdSut, exerciseSut).subscribe((exercises) => {
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
      } as Exercise;
        
      const updateSpy = jest.fn()
      beforeEach(() => {
        updateSpy.mockReset()
        mock.doc.mockReturnValue({
          update: updateSpy.mockResolvedValue(ExerciseAdapter.toDto(exerciseSut))
        })
      })

      it('updateExercises should request doc update',  (done) => {
        service.updateExercise(userIdSut, exerciseSut).subscribe(() => {
          expect(updateSpy).toHaveBeenCalledWith(ExerciseAdapter.toDto(exerciseSut))
          done()
        })
      })

      it('updateExercises should return exercise',  (done) => {
        service.updateExercise(userIdSut, exerciseSut).subscribe((exercises) => {
          expect(exercises).toEqual(exerciseSut)
          done()
        })
      })
    });

    describe('deleteExercise', () => {
      const userIdSut = 'asd'

      const exerciseSut = {
        name: 'exercise test name 0'
      } as Exercise;
        
      const deleteExerciseSpy = jest.fn()
      beforeEach(() => {
        deleteExerciseSpy.mockReset()
        mock.doc.mockReturnValue({
          delete: deleteExerciseSpy.mockResolvedValue(true)
        })
      })

      it('deleteExercise should request doc update',  (done) => {
        service.deleteExercise(userIdSut, exerciseSut).subscribe(() => {
          expect(deleteExerciseSpy).toHaveBeenCalled()
          done()
        })
      })
    });
  })
})
