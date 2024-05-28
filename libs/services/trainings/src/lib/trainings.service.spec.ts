import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { AngularFirestoreDocument, DocumentData, DocumentReference } from '@angular/fire/compat/firestore';
import { TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import firebase from 'firebase/compat/app/';
import { ExerciseTemplate, Training, TrainingExercise, TrainingExerciseSerie, TrainingQuery } from '@workout-tracker/models';
import { ExerciseTemplateAdapter, TrainingAdapter, TrainingExerciseAdapter, TrainingExerciseSerieAdapter } from '@workout-tracker/adapters';
import { TrainingsService } from './trainings.service';
import { ExerciseTemplatesRefService, exerciseTemplatesRefServiceMock } from '@workout-tracker/services/exercise-templates';
import { TrainingsRefService } from './trainings-ref.service';
import { trainingsRefServiceMock } from './trainings-ref.service.mock';


describe('TrainingsService', () => {
  let service: TrainingsService;
  let exerciseTemplatesRefService: ExerciseTemplatesRefService
  let trainingsRefService: TrainingsRefService
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
        { provide: TrainingsRefService, useValue: trainingsRefServiceMock },
        { provide: ExerciseTemplatesRefService, useValue: exerciseTemplatesRefServiceMock },
        TrainingsService,
        provideMockStore({
          initialState: {}
        })
      ]
    });
    service = TestBed.inject(TrainingsService);
    exerciseTemplatesRefService = TestBed.inject(ExerciseTemplatesRefService)
    trainingsRefService = TestBed.inject(TrainingsRefService)
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
      observations: 'observations',
      creationDate: new Date()
    } as TrainingExerciseSerie] as TrainingExerciseSerie[]
    const exerciseTemplateData = { id: 'exerciseTemplateId', creationDate: new Date()} as ExerciseTemplate
    const trainingExercisesData = [{
      id: 'trainingExerciseId',
      exerciseTemplate: exerciseTemplateData,
      creationDate: new Date(),
      series: trainingExerciseSeriesData
    } as TrainingExercise];

    const trainingData = [{ 
      id: 'trainingId',
      trainingExercises: trainingExercisesData,
      creationDate: new Date()
    }] as Training[];


    describe('getTraining', () => {
      const trainingSut = trainingData[0]

      beforeEach(() => {
        jest.spyOn(trainingsRefService, 'getTrainingDocRef').mockReturnValue({ get: jest.fn(() => of({ id: trainingSut.id, data: () => TrainingAdapter.toDto(trainingSut)}))} as any);
        jest.spyOn(trainingsRefService, 'getTrainingExercisesCollectionRef').mockReturnValue({ get: jest.fn(() => of({ docs: trainingExercisesData.map(data => ({id: data.id, data: () => TrainingExerciseAdapter.toDto(data, { get: () => { return of({ data: () => ExerciseTemplateAdapter.toDto(exerciseTemplateData), id: exerciseTemplateData.id })} } as any) }))}))} as any);
        jest.spyOn(trainingsRefService, 'getTrainingExerciseSeriesCollectionRef').mockReturnValue({ get: jest.fn(() => of({ docs: trainingExerciseSeriesData.map(data => ({ id: data.id, data: () => TrainingExerciseSerieAdapter.toDto(data) }))}))} as any);
      })

      it('getTraining should return training stored into Firebase collection',  (done) => {
        service.getTraining(userIdSut, trainingSut.id).subscribe((training) => {
          expect(training).toEqual(trainingSut)
          done()
        })
      })
    });

    describe('getTrainings', () => {
      beforeEach(() => {
        jest.spyOn(trainingsRefService, 'getTrainingsPaginatedCollectionRef').mockReturnValue({ get: jest.fn(() => of({ docs: trainingData.map(data => ({ id: data.id, data: () => TrainingAdapter.toDto(data) }))}))} as any);
        jest.spyOn(trainingsRefService, 'getTrainingExercisesCollectionRef').mockReturnValue({ get: jest.fn(() => of({ docs: trainingExercisesData.map(data => ({id: data.id, data: () => TrainingExerciseAdapter.toDto(data, { get: () => { return of({ data: () => ExerciseTemplateAdapter.toDto(exerciseTemplateData), id: exerciseTemplateData.id})} } as any) }))}))} as any);
        jest.spyOn(trainingsRefService, 'getTrainingExerciseSeriesCollectionRef').mockReturnValue({ get: jest.fn(() => of({ docs: trainingExerciseSeriesData.map(data => ({ id: data.id, data: () => TrainingExerciseSerieAdapter.toDto(data) }))}))} as any);
      })
      it('getTrainings should return an array of trainings with trainingExercises', (done) => {
        service.getTrainings(userIdSut, {} as TrainingQuery).subscribe((result) => {
          expect(result).toEqual(trainingData);
          done();
        });
      });
    });

    describe('getTrainingExercise', () => {
      const exerciseTemplateIdSut = 'exerciseTemplateIdSut'
      const trainingExerciseSut = {...trainingExercisesData[0] } as TrainingExercise
      const getExerciseTemplateRef = { id: 'documentReferenceId'} as DocumentReference

      beforeEach(() => {
        jest.spyOn(exerciseTemplatesRefService, 'getExerciseTemplateDocRef').mockReturnValue({ ref: getExerciseTemplateRef } as AngularFirestoreDocument<DocumentData>)
        jest.spyOn(trainingsRefService, 'getTrainingExerciseDocRef').mockReturnValue({ get: jest.fn(() => of({ id: trainingExerciseSut.id, data: () => TrainingExerciseAdapter.toDto(trainingExerciseSut, { get: () => { return of({ data: () => ExerciseTemplateAdapter.toDto(exerciseTemplateData), id: exerciseTemplateData.id })} } as any) }))} as any)
        jest.spyOn(trainingsRefService, 'getTrainingExerciseSeriesCollectionRef').mockReturnValue({ get: jest.fn(() => of({ docs: trainingExerciseSeriesData.map(data => ({ id: data.id, data: () => TrainingExerciseSerieAdapter.toDto(data) }))}))} as any);
      })
      it('getTrainingExercise should return trainingExercise', (done) => {
        service.getTrainingExercise(userIdSut, '', exerciseTemplateIdSut).subscribe((result) => {
          expect(result).toEqual(trainingExerciseSut);
          done();
        });
      });
    });

    describe('getPrevTrainingExercisesByExerciseTemplate', () => {
      const getExerciseTemplateRef = { id: 'documentReferenceId'} as DocumentReference
      const trainingExerciseSut = {...trainingExercisesData[0] } as TrainingExercise

      beforeEach(() => {
        jest.spyOn(exerciseTemplatesRefService, 'getExerciseTemplateDocRef').mockReturnValue({ ref: getExerciseTemplateRef } as AngularFirestoreDocument<DocumentData>)
        jest.spyOn(trainingsRefService, 'getExerciseTemplateTrainingExercisesDocRefs').mockReturnValue({ get: jest.fn(() => of({docs: [ {  id: trainingExerciseSut.id , data: () =>  TrainingExerciseAdapter.toDto(trainingExerciseSut, { get: () => { return of({ data: () => ExerciseTemplateAdapter.toDto(trainingExerciseSut.exerciseTemplate), id: trainingExerciseSut.exerciseTemplate.id })} } as any), ref: { parent: { parent: { id: trainingExerciseSut.id } }}} ] }))} as any)
        jest.spyOn(trainingsRefService, 'getTrainingExerciseSeriesCollectionRef').mockReturnValue({ get: jest.fn(() => of({ docs: trainingExerciseSeriesData.map(data => ({ id: data.id, data: () => TrainingExerciseSerieAdapter.toDto(data) }))}))} as any);
      })
      it('getPrevTrainingExercisesByExerciseTemplate should return an array of trainings with trainingExercises', (done) => {
        service.getPrevTrainingExercisesByExerciseTemplate(userIdSut, trainingExerciseSut).subscribe((result) => {
          expect(result).toEqual([trainingExerciseSut]);
          done();
        });
      });
    });

    describe('getExerciseTemplateTrainings', () => {
      const exerciseTemplateIdSut = 'exerciseTemplateIdSut'
      const getExerciseTemplateRef = { id: 'documentReferenceId'} as DocumentReference
      const trainingSut = {...trainingData[0] } as Training

      beforeEach(() => {
        jest.spyOn(exerciseTemplatesRefService, 'getExerciseTemplateDocRef').mockReturnValue({ ref: getExerciseTemplateRef } as AngularFirestoreDocument<DocumentData>)
        jest.spyOn(trainingsRefService, 'getExerciseTemplateTrainingExercisesDocRefs').mockReturnValue({ get: jest.fn(() => of({ docs: [ { ref: { parent: { parent: { id: trainingSut.id } }}} ] }))} as any)
        jest.spyOn(trainingsRefService, 'getTrainingDocRef').mockReturnValue({ get: jest.fn(() => of({ id: trainingSut.id, data: () => TrainingAdapter.toDto(trainingSut)}))} as any);
        jest.spyOn(trainingsRefService, 'getTrainingExercisesCollectionRef').mockReturnValue({ get: jest.fn(() => of({ docs: trainingExercisesData.map(data => ({id: data.id, data: () => TrainingExerciseAdapter.toDto(data, { get: () => { return of({ data: () => ExerciseTemplateAdapter.toDto(exerciseTemplateData), id: exerciseTemplateData.id })} } as any) }))}))} as any);
        jest.spyOn(trainingsRefService, 'getTrainingExerciseSeriesCollectionRef').mockReturnValue({ get: jest.fn(() => of({ docs: trainingExerciseSeriesData.map(data => ({ id: data.id, data: () => TrainingExerciseSerieAdapter.toDto(data)  }))}))} as any);
      })
      it('getExerciseTemplateTrainings should return an array of trainings with trainingExercises', (done) => {
        service.getExerciseTemplateTrainings(userIdSut, exerciseTemplateIdSut).subscribe((result) => {
          expect(result).toEqual([trainingSut]);
          done();
        });
      });
    });

    describe('setTraining', () => {
      const trainingSut = {...trainingData[0], trainingExercises: [] } as Training
      const addSpy = jest.fn()

      beforeEach(() => {
        jest.spyOn(trainingsRefService, 'getTrainingsCollectionRef').mockReturnValue({ add: addSpy.mockResolvedValue({ id: trainingSut.id }) } as any)
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
        jest.spyOn(trainingsRefService, 'getTrainingExercisesCollectionRef').mockReturnValue({ add: addSpy.mockResolvedValue({ id: trainingExerciseSut.id }) } as any)
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
      const trainingExerciseSerieSut = {...trainingExerciseSeriesData[0], creationDate: new Date() } as TrainingExerciseSerie
      const addSpy = jest.fn()

      beforeEach(() => {
        jest.spyOn(trainingsRefService, 'getTrainingExerciseSeriesCollectionRef').mockReturnValue({ add: addSpy.mockResolvedValue({ id: trainingExerciseSerieSut.id }) } as any)
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
        jest.spyOn(trainingsRefService, 'getTrainingDocRef').mockReturnValue({ update: updateSpy.mockResolvedValue({}) } as any)
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
        jest.spyOn(trainingsRefService, 'getTrainingExerciseDocRef').mockReturnValue({ update: updateSpy.mockResolvedValue({ }) } as any)
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
      const trainingExerciseSerieSut = {...trainingExerciseSeriesData[0], creationDate: new Date() } as TrainingExerciseSerie
      const updateSpy = jest.fn()

      beforeEach(() => {
        jest.spyOn(trainingsRefService, 'getTrainingExerciseSerieDocRef').mockReturnValue({ update: updateSpy.mockResolvedValue({ }) } as any)
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
        jest.spyOn(trainingsRefService, 'getTrainingDocRef').mockReturnValue({ delete: deleteSpy.mockResolvedValue({}) } as any)
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
        jest.spyOn(trainingsRefService, 'getTrainingExerciseDocRef').mockReturnValue({ delete: deleteSpy.mockResolvedValue({ }) } as any)
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
        jest.spyOn(trainingsRefService, 'getTrainingExerciseSerieDocRef').mockReturnValue({ delete: deleteSpy.mockResolvedValue({ }) } as any)
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
