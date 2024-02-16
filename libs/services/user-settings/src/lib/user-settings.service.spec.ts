import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { UserSettingsService } from './user-settings.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { CultureService } from '@workout-tracker/services/culture';
import { TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserSettings } from '@workout-tracker/models';
import firebase from 'firebase/compat/app/';

const mock = {
  collection: jest.fn().mockReturnValue({}  as AngularFirestoreCollection<unknown>)
};


describe('UserSettingsService', () => {
  let service: UserSettingsService;
  let store: Store;
  let translateService: TranslateService;
  let cultureService: CultureService

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
    cultureService = TestBed.inject(CultureService)
    store = TestBed.inject(Store)
    translateService = TestBed.inject(TranslateService);

  });

  describe('Unit tests', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  })
  describe('Integration tests', () => {
    describe('getAnonymousSettings', () => {
      const browserLanguageSut = 'browserLang';
      const browserIsDarkModeSut = true
      beforeEach(() => {
        jest.spyOn(cultureService, 'getBrowserLanguage').mockReturnValue(browserLanguageSut)  
        jest.spyOn(cultureService, 'getBrowserIsDarkMode').mockReturnValue(browserIsDarkModeSut)  
      })

      it('getAnonymousSettings should request cultureService changeLanguage function', () => {
        const changeLanguageSpy = jest.spyOn(cultureService, 'changeLanguage')

        service.getAnonymousSettings()

        expect(changeLanguageSpy).toHaveBeenCalledWith(browserLanguageSut)
      })

      it('getAnonymousSettings should return browser language & darkmode', () => {
        const changeLanguageSpy = jest.spyOn(cultureService, 'changeLanguage')

        service.getAnonymousSettings().subscribe((userSettings: UserSettings) => {
          expect(userSettings.language).toEqual(browserLanguageSut)
          expect(userSettings.darkMode).toEqual(browserIsDarkModeSut)
        })

        expect(changeLanguageSpy).toHaveBeenCalledWith(browserLanguageSut)
      })
    })

    describe('getUserSettings', () => {
      const userSettingsSut = {
        language: 'testing lang'
      } as UserSettings

      beforeEach(() => {
        mock.collection.mockReturnValue({
          doc: jest.fn().mockReturnValue({
            get: jest.fn().mockReturnValue({
                data: jest.fn().mockReturnValue(userSettingsSut)
            })
          })
        })
      })

      it('getUserSettings should return userSettings stored into Firebase', () => {
        service.getUserSettings('asd').subscribe((userSettings) => {
          expect(userSettings).toEqual(userSettingsSut)
        })
      })
    })
  })
})
