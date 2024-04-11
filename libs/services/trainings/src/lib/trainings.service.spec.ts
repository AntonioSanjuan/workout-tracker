import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentData, DocumentReference } from '@angular/fire/compat/firestore';
import { TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import firebase from 'firebase/compat/app/';
import { ExerciseTemplate, Training, TrainingExercise, TrainingExerciseSerie, TrainingQuery } from '@workout-tracker/models';
import { TrainingAdapter, TrainingExerciseAdapter, TrainingExerciseSerieAdapter } from '@workout-tracker/adapters';
import { TrainingsService } from './trainings.service';
import { ExerciseTemplatesRefService, exerciseTemplatesRefServiceMock } from '@workout-tracker/services/exercise-templates';

const mock = {
  collection: jest.fn().mockReturnValue({}  as AngularFirestoreCollection<unknown>),
  doc: jest.fn().mockReturnValue({}  as AngularFirestoreDocument<unknown>)
};


describe('TrainingsService', () => {
  let service: TrainingsService;
  let exerciseTemplatesRefService: ExerciseTemplatesRefService
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
        { provide: ExerciseTemplatesRefService, useValue: exerciseTemplatesRefServiceMock },
        TrainingsService,
        provideMockStore({
          initialState: {}
        })
      ]
    });
    service = TestBed.inject(TrainingsService);
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
    const userIdSut = 'user123';
    const trainingExerciseSeriesData = [{
      id: 'trainingExerciseSerieId',
      weight: 100,
      repetitions: 10,
      observations: 'observations'
    } as TrainingExerciseSerie] as TrainingExerciseSerie[]
    const exerciseTemplateData = { id: 'exerciseTemplateId'} as ExerciseTemplate
    const trainingExercisesData = [{
      id: 'trainingExerciseId',
      exerciseTemplate: exerciseTemplateData,
      series: trainingExerciseSeriesData
    } as TrainingExercise];

    const trainingData = [{ 
      id: 'trainingId',
      trainingExercises: trainingExercisesData,
      creationDate: new Date()
    }] as Training[];


    describe('getTraining', () => {
      const exerciseSut = trainingData[0]

      beforeEach(() => {
        jest.spyOn(TrainingsService.prototype as any, 'getTrainingDocRef').mockReturnValue({ get: jest.fn(() => of({ id: exerciseSut.id, data: () => TrainingAdapter.toDto(exerciseSut)}))});
        jest.spyOn(TrainingsService.prototype as any, 'getTrainingExercisesCollectionRef').mockReturnValue({ get: jest.fn(() => of({ docs: trainingExercisesData.map(data => ({id: data.id, data: () => TrainingExerciseAdapter.toDto(data, { get: () => { return of({ data: () => (exerciseTemplateData)})} } as any) }))}))});
        jest.spyOn(TrainingsService.prototype as any, 'getTrainingExerciseSeriesCollectionRef').mockReturnValue({ get: jest.fn(() => of({ docs: trainingExerciseSeriesData.map(data => ({ id: data.id, data: () => data }))}))});
      })

      it('getTraining should return training stored into Firebase collection',  (done) => {
        service.getTraining(userIdSut, exerciseSut.id).subscribe((training) => {
          expect(training).toEqual(exerciseSut)
          done()
        })
      })
    });

    describe('getTrainings', () => {
      beforeEach(() => {
        jest.spyOn(TrainingsService.prototype as any, 'getTrainingsPaginatedCollectionRef').mockReturnValue({ get: jest.fn(() => of({ docs: trainingData.map(data => ({ id: data.id, data: () => TrainingAdapter.toDto(data) }))}))});
        jest.spyOn(TrainingsService.prototype as any, 'getTrainingExercisesCollectionRef').mockReturnValue({ get: jest.fn(() => of({ docs: trainingExercisesData.map(data => ({id: data.id, data: () => TrainingExerciseAdapter.toDto(data, { get: () => { return of({ data: () => (exerciseTemplateData)})} } as any) }))}))});
        jest.spyOn(TrainingsService.prototype as any, 'getTrainingExerciseSeriesCollectionRef').mockReturnValue({ get: jest.fn(() => of({ docs: trainingExerciseSeriesData.map(data => ({ id: data.id, data: () => data }))}))});
      })
      it('getTrainings should return an array of trainings with trainingExercises', (done) => {
        service.getTrainings(userIdSut, {} as TrainingQuery).subscribe((result) => {
          expect(result).toEqual(trainingData);
          done();
        });
      });
    });

    describe('setTraining', () => {
      const trainingSut = {...trainingData[0], trainingExercises: [] } as Training
      const addSpy = jest.fn()

      beforeEach(() => {
        jest.spyOn(TrainingsService.prototype as any, 'getTrainingsCollectionRef').mockReturnValue({ add: addSpy.mockResolvedValue({ id: trainingSut.id }) })
      });

      it('setTraining should request collection add',  (done) => {
        service.setTraining(userIdSut, trainingSut).subscribe(() => {
          expect(addSpy).toHaveBeenCalledWith(TrainingAdapter.toDto(trainingSut))
          done()
        })
      })

      it('setExerciseTemplate should return training',  (done) => {
        service.setTraining(userIdSut, trainingSut).subscribe((result) => {
          expect(result).toEqual(trainingSut);
          done()
        })
      })
    });

    describe('setTrainingExercise', () => {
      const trainingExerciseSut = {...trainingExercisesData[0], exerciseTemplate: exerciseTemplateData, series: [] } as TrainingExercise
      const getExerciseTemplateRef = { id: 'documentReferenceId'} as DocumentReference
      const addSpy = jest.fn()

      beforeEach(() => {
        jest.spyOn(TrainingsService.prototype as any, 'getTrainingExercisesCollectionRef').mockReturnValue({ add: addSpy.mockResolvedValue({ id: trainingExerciseSut.id }) })
        jest.spyOn(exerciseTemplatesRefService, 'getExerciseTemplateDocRef').mockReturnValue({ ref: getExerciseTemplateRef } as AngularFirestoreDocument<DocumentData>)
      });

      it('setTrainingExercise should request collection add',  (done) => {
        service.setTrainingExercise(userIdSut, trainingExerciseSut.id, trainingExerciseSut).subscribe(() => {
          expect(addSpy).toHaveBeenCalledWith(TrainingExerciseAdapter.toDto(trainingExerciseSut, getExerciseTemplateRef))
          done()
        })
      })

      it('setTrainingExercise should request exerciseService getExerciseTemplateDocRef',  (done) => {
        const getExerciseDocRefSpy = jest.spyOn(exerciseTemplatesRefService, 'getExerciseTemplateDocRef').mockReturnValue({ ref: getExerciseTemplateRef } as AngularFirestoreDocument<DocumentData>)
        service.setTrainingExercise(userIdSut, trainingExerciseSut.id, trainingExerciseSut).subscribe(() => {
          expect(getExerciseDocRefSpy).toHaveBeenCalledWith(userIdSut, trainingExerciseSut.exerciseTemplate.id)
          done()
        })
      })

      it('setTrainingExercise should return trainingExercise',  (done) => {
        service.setTrainingExercise(userIdSut, trainingExerciseSut.id, trainingExerciseSut).subscribe((result) => {
          expect(result).toEqual(trainingExerciseSut);
          done()
        })
      })
    });

    describe('setTrainingExerciseSerie', () => {
      const trainingExerciseSerieSut = {...trainingExerciseSeriesData[0] } as TrainingExerciseSerie
      const addSpy = jest.fn()

      beforeEach(() => {
        jest.spyOn(TrainingsService.prototype as any, 'getTrainingExerciseSeriesCollectionRef').mockReturnValue({ add: addSpy.mockResolvedValue({ id: trainingExerciseSerieSut.id }) })
      });

      it('setTrainingExerciseSerie should request collection add',  (done) => {
        service.setTrainingExerciseSerie(userIdSut, trainingData[0].id, trainingExercisesData[0].id, trainingExerciseSerieSut).subscribe(() => {
          expect(addSpy).toHaveBeenCalledWith(TrainingExerciseSerieAdapter.toDto(trainingExerciseSerieSut))
          done()
        })
      })

      it('setTrainingExerciseSerie should return trainingExerciseSerie',  (done) => {
        service.setTrainingExerciseSerie(userIdSut, trainingData[0].id, trainingExercisesData[0].id, trainingExerciseSerieSut).subscribe((result) => {
          expect(result).toEqual(trainingExerciseSerieSut);
          done()
        })
      })
    });

    describe('updateTraining', () => {
      const trainingSut = {...trainingData[0] } as Training
      const updateSpy = jest.fn()

      beforeEach(() => {
        jest.spyOn(TrainingsService.prototype as any, 'getTrainingDocRef').mockReturnValue({ update: updateSpy.mockResolvedValue({}) })
      });

      it('updateTraining should request collection update',  (done) => {
        service.updateTraining(userIdSut, trainingSut).subscribe(() => {
          expect(updateSpy).toHaveBeenCalledWith(TrainingAdapter.toDto(trainingSut))
          done()
        })
      })

      it('updateTraining should return training',  (done) => {
        service.updateTraining(userIdSut, trainingSut).subscribe((result) => {
          expect(result).toEqual(trainingSut);
          done()
        })
      })
    });

    describe('updateTrainingExercise', () => {
      const trainingExerciseSut = {...trainingExercisesData[0], exerciseTemplate: exerciseTemplateData, series: [] } as TrainingExercise
      const getExerciseTemplateRef = { id: 'documentReferenceId'} as DocumentReference
      const updateSpy = jest.fn()

      beforeEach(() => {
        jest.spyOn(TrainingsService.prototype as any, 'getTrainingExerciseDocRef').mockReturnValue({ update: updateSpy.mockResolvedValue({ }) })
        jest.spyOn(exerciseTemplatesRefService, 'getExerciseTemplateDocRef').mockReturnValue({ ref: getExerciseTemplateRef } as AngularFirestoreDocument<DocumentData>)
      });

      it('updateTrainingExercise should request collection update',  (done) => {
        service.updateTrainingExercise(userIdSut, trainingExerciseSut.id, trainingExerciseSut).subscribe(() => {
          expect(updateSpy).toHaveBeenCalledWith(TrainingExerciseAdapter.toDto(trainingExerciseSut, getExerciseTemplateRef))
          done()
        })
      })

      it('setTrainingExercise should request exerciseService getExerciseTemplateDocRef',  (done) => {
        const getExerciseDocRefSpy = jest.spyOn(exerciseTemplatesRefService, 'getExerciseTemplateDocRef').mockReturnValue({ ref: getExerciseTemplateRef } as AngularFirestoreDocument<DocumentData>)
        service.updateTrainingExercise(userIdSut, trainingExerciseSut.id, trainingExerciseSut).subscribe(() => {
          expect(getExerciseDocRefSpy).toHaveBeenCalledWith(userIdSut, trainingExerciseSut.exerciseTemplate.id)
          done()
        })
      })

      it('setTrainingExercise should return trainingExercise',  (done) => {
        service.updateTrainingExercise(userIdSut, trainingExerciseSut.id, trainingExerciseSut).subscribe((result) => {
          expect(result).toEqual(trainingExerciseSut);
          done()
        })
      })
    });

    describe('updateTrainingExerciseSerie', () => {
      const trainingExerciseSerieSut = {...trainingExerciseSeriesData[0] } as TrainingExerciseSerie
      const updateSpy = jest.fn()

      beforeEach(() => {
        jest.spyOn(TrainingsService.prototype as any, 'getTrainingExerciseSerieDocRef').mockReturnValue({ update: updateSpy.mockResolvedValue({ }) })
      });

      it('updateTrainingExerciseSerie should request collection update',  (done) => {
        service.updateTrainingExerciseSerie(userIdSut, trainingData[0].id, trainingExercisesData[0].id, trainingExerciseSerieSut).subscribe(() => {
          expect(updateSpy).toHaveBeenCalledWith(TrainingExerciseSerieAdapter.toDto(trainingExerciseSerieSut))
          done()
        })
      })

      it('updateTrainingExerciseSerie should return trainingExerciseSerie',  (done) => {
        service.updateTrainingExerciseSerie(userIdSut, trainingData[0].id, trainingExercisesData[0].id, trainingExerciseSerieSut).subscribe((result) => {
          expect(result).toEqual(trainingExerciseSerieSut);
          done()
        })
      })
    });

    describe('deleteTraining', () => {
      const trainingSut = {...trainingData[0] } as Training
      const deleteSpy = jest.fn()

      beforeEach(() => {
        jest.spyOn(TrainingsService.prototype as any, 'getTrainingDocRef').mockReturnValue({ delete: deleteSpy.mockResolvedValue({}) })
      });

      it('deleteTraining should request collection delete',  (done) => {
        service.deleteTraining(userIdSut, trainingSut).subscribe(() => {
          expect(deleteSpy).toHaveBeenCalled()
          done()
        })
      })

      it('deleteTraining should return true',  (done) => {
        service.deleteTraining(userIdSut, trainingSut).subscribe((result) => {
          expect(result).toEqual(true);
          done()
        })
      })
    });

    describe('deleteTrainingExercise', () => {
      const trainingExerciseSut = {...trainingExercisesData[0], exerciseTemplate: exerciseTemplateData, series: [] } as TrainingExercise
      const deleteSpy = jest.fn()

      beforeEach(() => {
        jest.spyOn(TrainingsService.prototype as any, 'getTrainingExerciseDocRef').mockReturnValue({ delete: deleteSpy.mockResolvedValue({ }) })
      });

      it('deleteTrainingExercise should request collection delete',  (done) => {
        service.deleteTrainingExercise(userIdSut, trainingExerciseSut.id, trainingExerciseSut).subscribe(() => {
          expect(deleteSpy).toHaveBeenCalled()
          done()
        })
      })

      it('deleteTrainingExercise should return true',  (done) => {
        service.deleteTrainingExercise(userIdSut, trainingExerciseSut.id, trainingExerciseSut).subscribe((result) => {
          expect(result).toEqual(true);
          done()
        })
      })
    });

    describe('deleteTrainingExerciseSerie', () => {
      const trainingExerciseSerieSut = {...trainingExerciseSeriesData[0] } as TrainingExerciseSerie
      const deleteSpy = jest.fn()

      beforeEach(() => {
        jest.spyOn(TrainingsService.prototype as any, 'getTrainingExerciseSerieDocRef').mockReturnValue({ delete: deleteSpy.mockResolvedValue({ }) })
      });

      it('deleteTrainingExerciseSerie should request collection delete',  (done) => {
        service.deleteTrainingExerciseSerie(userIdSut, trainingData[0].id, trainingExercisesData[0].id, trainingExerciseSerieSut).subscribe(() => {
          expect(deleteSpy).toHaveBeenCalled()
          done()
        })
      })

      it('deleteTrainingExerciseSerie should return true',  (done) => {
        service.deleteTrainingExerciseSerie(userIdSut, trainingData[0].id, trainingExercisesData[0].id, trainingExerciseSerieSut).subscribe((result) => {
          expect(result).toEqual(true);
          done()
        })
      })
    });
  })
})
