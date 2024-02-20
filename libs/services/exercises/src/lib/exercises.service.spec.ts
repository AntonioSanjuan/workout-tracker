import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { ExercisesService } from './exercises.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { CultureService } from '@workout-tracker/services/culture';
import { TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserSettings } from '@workout-tracker/models';
import firebase from 'firebase/compat/app/';
import { of } from 'rxjs';

const mock = {
  collection: jest.fn().mockReturnValue({}  as AngularFirestoreCollection<unknown>)
};


describe('ExercisesService', () => {
  let service: ExercisesService;
  let store: Store;
  let translateService: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
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
  })
})
