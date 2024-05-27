import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreCollectionGroup, AngularFirestoreDocument, Query } from '@angular/fire/compat/firestore';
import { TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { TrainingsRefService } from './trainings-ref.service';
import { TrainingQuery } from '@workout-tracker/models';

const mock = {
  collection: jest.fn().mockReturnValue({}  as AngularFirestoreCollection<unknown>),
  doc: jest.fn().mockReturnValue({}  as AngularFirestoreDocument<unknown>),
  collectionGroup: jest.fn().mockReturnValue({}  as AngularFirestoreCollectionGroup<unknown>),
  query: jest.fn().mockReturnValue({}  as Query<unknown>),
};


describe('TrainingsRefService', () => {
  let service: TrainingsRefService;
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
        TrainingsRefService,
        provideMockStore({
          initialState: {}
        })
      ]
    });
    service = TestBed.inject(TrainingsRefService);
    store = TestBed.inject(Store)
    translateService = TestBed.inject(TranslateService);

  });

  describe('Unit tests', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  })
  describe('Integration tests', () => {

    describe('getTrainingsCollectionRef', () => {
      const userIdSut = 'userIdTest'

      it('getTrainingsCollectionRef should return firebaseDataBase collection ref',  () => {
        service.getTrainingsCollectionRef(userIdSut)
        expect(mock.collection).toHaveBeenCalledWith(`user/${userIdSut}/trainings`)
      })
    });

    describe('getTrainingsPaginatedCollectionRef', () => {
      const userIdSut = 'userIdTest'
      const trainingQuerySut = {} as TrainingQuery

      it('getTrainingsPaginatedCollectionRef should return firebaseDataBase collection ref',  () => {
        service.getTrainingsPaginatedCollectionRef(userIdSut, trainingQuerySut)
        expect(mock.collection).toHaveBeenCalledWith(`user/${userIdSut}/trainings`, expect.anything())
      })
    });

    describe('getTrainingExercisesCollectionRef', () => {
      const userIdSut = 'userIdTest'
      const trainingIdSut = 'trainingIdTest'

      it('getTrainingExercisesCollectionRef should return firebaseDataBase collection ref',  () => {
        service.getTrainingExercisesCollectionRef(userIdSut, trainingIdSut)
        expect(mock.collection).toHaveBeenCalledWith(`user/${userIdSut}/trainings/${trainingIdSut}/exercises`, expect.anything())
      })
    });

    describe('getTrainingExerciseSeriesCollectionRef', () => {
      const userIdSut = 'userIdTest'
      const trainingIdSut = 'trainingIdTest'
      const trainingExerciseIdSut = 'trainingExerciseIdTest'

      it('getTrainingExerciseSeriesCollectionRef should return firebaseDataBase collection ref',  () => {
        service.getTrainingExerciseSeriesCollectionRef(userIdSut, trainingIdSut, trainingExerciseIdSut)
        expect(mock.collection).toHaveBeenCalledWith(`user/${userIdSut}/trainings/${trainingIdSut}/exercises/${trainingExerciseIdSut}/series`, expect.anything())
      })
    });

    describe('getTrainingDocRef', () => {
      const userIdSut = 'userIdTest'
      const trainingIdSut = 'trainingIdTest';

      it('getTrainingDocRef should return firebaseDataBase doc ref',  () => {
        service.getTrainingDocRef(userIdSut, trainingIdSut)
        expect(mock.doc).toHaveBeenCalledWith(`user/${userIdSut}/trainings/${trainingIdSut}`)
      })
    });

    describe('getTrainingExerciseDocRef', () => {
      const userIdSut = 'userIdTest'
      const trainingIdSut = 'trainingIdTest';
      const trainingExerciseIdSut = 'trainingExerciseIdTest';

      it('getTrainingExerciseDocRef should return firebaseDataBase doc ref',  () => {
        service.getTrainingExerciseDocRef(userIdSut, trainingIdSut, trainingExerciseIdSut)
        expect(mock.doc).toHaveBeenCalledWith(`user/${userIdSut}/trainings/${trainingIdSut}/exercises/${trainingExerciseIdSut}`)
      })
    });

    describe('getTrainingExerciseSerieDocRef', () => {
      const userIdSut = 'userIdTest'
      const trainingIdSut = 'trainingIdTest';
      const trainingExerciseIdSut = 'trainingExerciseIdTest';
      const trainingExerciseSerieIdSut = 'trainingExerciseSerieIdTest';

      it('getTrainingExerciseSerieDocRef should return firebaseDataBase doc ref',  () => {
        service.getTrainingExerciseSerieDocRef(userIdSut, trainingIdSut, trainingExerciseIdSut, trainingExerciseSerieIdSut)
        expect(mock.doc).toHaveBeenCalledWith(`user/${userIdSut}/trainings/${trainingIdSut}/exercises/${trainingExerciseIdSut}/series/${trainingExerciseSerieIdSut}`)
      })
    });

    describe('getExerciseTemplateTrainingExercisesDocRefs', () => {
      const exerciseTemplateRefSut = {} as AngularFirestoreDocument

      it('getExerciseTemplateTrainingExercisesDocRefs should return firebaseDataBase AngularFirestoreCollectionGroup ref',  () => {
        service.getExerciseTemplateTrainingExercisesDocRefs(exerciseTemplateRefSut)
        expect(mock.collectionGroup).toHaveBeenCalledWith('exercises', expect.anything())
      })
    });
  })
})
