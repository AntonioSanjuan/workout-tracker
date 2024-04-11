import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import firebase from 'firebase/compat/app/';
import { ExerciseTemplate } from '@workout-tracker/models';
import { ExerciseTemplateAdapter } from '@workout-tracker/adapters';
import { ExerciseTemplatesRefService } from './exercise-templates-ref.service';

const mock = {
  collection: jest.fn().mockReturnValue({}  as AngularFirestoreCollection<unknown>),
  doc: jest.fn().mockReturnValue({}  as AngularFirestoreDocument<unknown>)
};


describe('ExerciseTemplatesRefService', () => {
  let service: ExerciseTemplatesRefService;
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
        ExerciseTemplatesRefService,
        provideMockStore({
          initialState: {}
        })
      ]
    });
    service = TestBed.inject(ExerciseTemplatesRefService);
    store = TestBed.inject(Store)
    translateService = TestBed.inject(TranslateService);

  });

  describe('Unit tests', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  })
  describe('Integration tests', () => {

    describe('getExerciseTemplatesCollectionRef', () => {
      const userIdSut = 'asd'

      it('getExerciseTemplatesCollectionRef should return firebaseDataBase collection ref',  () => {
        service.getExerciseTemplatesCollectionRef(userIdSut)
        expect(mock.collection).toHaveBeenCalledWith(`user/${userIdSut}/exercises`)
      })
    });

    describe('getExerciseTemplateDocRef', () => {
      const userIdSut = 'asd'
      const exerciseIdSut = 'dddd';

      it('getExerciseTemplateDocRef should return firebaseDataBase doc ref',  () => {
        service.getExerciseTemplateDocRef(userIdSut, exerciseIdSut)
        expect(mock.doc).toHaveBeenCalledWith(`user/${userIdSut}/exercises/${exerciseIdSut}`)
      })
    });
  })
})
