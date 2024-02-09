import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { UserSettingsService } from './user-settings.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { CultureService } from '@workout-tracker/services/culture';
import { TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

const mock = {
  collection: jest.fn().mockReturnValue({}  as AngularFirestoreCollection<unknown>)
};


describe('UserSettingsService', () => {
  let service: UserSettingsService;
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
        CultureService,
        UserSettingsService,
        provideMockStore({
          initialState: {}
        })
      ]
    });
    service = TestBed.inject(UserSettingsService);
    store = TestBed.inject(Store)
    translateService = TestBed.inject(TranslateService);

  });

  describe('Unit tests', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  })
});
