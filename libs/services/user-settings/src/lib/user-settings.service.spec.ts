import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { UserSettingsService } from './user-settings.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { CultureService } from '@workout-tracker/services/culture';
import { TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserSettings } from '@workout-tracker/models';
import firebase from 'firebase/compat/app/';
import { of } from 'rxjs';
import { DateAdapter } from '@angular/material/core';

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
        }),
        DateAdapter
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

      it('getAnonymousSettings should request cultureService changeLanguage function', (done) => {
        const changeLanguageSpy = jest.spyOn(cultureService, 'changeLanguage')

        service.getAnonymousSettings().subscribe((asdasd) => {
          expect(changeLanguageSpy).toHaveBeenCalledWith(browserLanguageSut)
          done()
        })
      })

      it('getAnonymousSettings should request cultureService changeDarkMode function', (done) => {
        const changeDarkModeSpy = jest.spyOn(cultureService, 'changeDarkMode')

        service.getAnonymousSettings().subscribe((asdasd) => {
          expect(changeDarkModeSpy).toHaveBeenCalledWith(browserIsDarkModeSut)
          done()
        })
      })

      it('getAnonymousSettings should return browser language & darkmode', (done) => {
        service.getAnonymousSettings().subscribe((userSettings: UserSettings) => {
          expect(userSettings.language).toEqual(browserLanguageSut)
          expect(userSettings.darkMode).toEqual(browserIsDarkModeSut)
          done()
        })
      })
    })

    describe('getUserSettings', () => {
      const userIdSut = 'asd'
      const storedUserSettingsSut = {
        language: 'testing lang',
        darkMode: true
      } as UserSettings

      beforeEach(() => {
        mock.collection.mockReturnValue({
          doc: jest.fn().mockReturnValue({
            get: jest.fn().mockReturnValue(of(
              {
                data: jest.fn().mockReturnValue(storedUserSettingsSut)
              } as Partial<firebase.firestore.DocumentSnapshot<UserSettings>>
            ))
          })
        })
      })

      it('getUserSettings should request cultureService changeLanguage function', (done) => {
        const changeLanguageSpy = jest.spyOn(cultureService, 'changeLanguage')

        service.getUserSettings(userIdSut).subscribe(() => {
          expect(changeLanguageSpy).toHaveBeenCalledWith(storedUserSettingsSut.language)
          done()
        })
      })

      it('getUserSettings should request cultureService changeDarkMode function', (done) => {
        const changeDarkModeSpy = jest.spyOn(cultureService, 'changeDarkMode')

        service.getUserSettings(userIdSut).subscribe((asdasd) => {
          expect(changeDarkModeSpy).toHaveBeenCalledWith(storedUserSettingsSut.darkMode)
          done()
        })
      })

      it('getUserSettings should return userSettings stored into Firebase collection', (done) => {
        service.getUserSettings(userIdSut).subscribe((userSettings) => {
          expect(userSettings).toEqual(storedUserSettingsSut)
          done()
        })
      })
    })

    describe('setUserSettings', () => {
      const userIdSut = 'asd'
      const browserLanguageSut = 'browserLang';
      const browserIsDarkModeSut = true

      const setFunction = jest.fn().mockReturnValue(of({}))
      beforeEach(() => {
        jest.spyOn(cultureService, 'getBrowserLanguage').mockReturnValue(browserLanguageSut)  
        jest.spyOn(cultureService, 'getBrowserIsDarkMode').mockReturnValue(browserIsDarkModeSut)  

        mock.collection.mockReturnValue({
          doc: jest.fn().mockReturnValue({
            set: setFunction
          })
        })
      })

      it('setUserSettings should request cultureService changeLanguage function', (done) => {
        const changeLanguageSpy = jest.spyOn(cultureService, 'changeLanguage')

        service.setUserSettings(userIdSut).subscribe(() => {
          expect(changeLanguageSpy).toHaveBeenCalledWith(browserLanguageSut)
          done()
        })
      })

      it('setUserSettings should request cultureService changeDarkMode function', (done) => {
        const changeDarkModeSpy = jest.spyOn(cultureService, 'changeDarkMode')

        service.setUserSettings(userIdSut).subscribe(() => {
          expect(changeDarkModeSpy).toHaveBeenCalledWith(browserIsDarkModeSut)
          done()
        })
      })

      it('setUserSettings should return userSettings from browser', (done) => {
        service.setUserSettings(userIdSut).subscribe((userSettings) => {
          expect(userSettings).toEqual({
            language: browserLanguageSut,
            darkMode: browserIsDarkModeSut
          } as UserSettings)
          done()
        })
      })

      it('setUserSettings should request set userSettings into Firebase collection', (done) => {
        service.setUserSettings(userIdSut).subscribe(() => {
          expect(setFunction).toHaveBeenCalledWith({
            language: browserLanguageSut,
            darkMode: browserIsDarkModeSut
          } as UserSettings, {})
          done()
        })
      })
    })

    describe('updateAnonymousSettings', () => {
      const userSettingsSut = {
        language: 'test lang',
        darkMode: true
      } as UserSettings

      it('updateAnonymousSettings should request cultureService changeLanguage function', (done) => {
        const changeLanguageSpy = jest.spyOn(cultureService, 'changeLanguage')

        service.updateAnonymousSettings(userSettingsSut).subscribe(() => {
          expect(changeLanguageSpy).toHaveBeenCalledWith(userSettingsSut.language)
          done()
        })
      })

      it('updateAnonymousSettings should request cultureService changeDarkMode function', (done) => {
        const changeDarkModeSpy = jest.spyOn(cultureService, 'changeDarkMode')

        service.updateAnonymousSettings(userSettingsSut).subscribe(() => {
          expect(changeDarkModeSpy).toHaveBeenCalledWith(userSettingsSut.darkMode)
          done()
        })
      })

      it('updateAnonymousSettings should return input userSettings', (done) => {
        service.updateAnonymousSettings(userSettingsSut).subscribe((userSettings) => {
          expect(userSettings).toEqual(userSettingsSut)
          done()
        })
      })
    })

    describe('updateUserSettings', () => {
      const userIdSut = 'asd'
      const userSettingsSut = {
        language: 'test lang',
        darkMode: true
      } as UserSettings

      const updateFunction = jest.fn().mockReturnValue(of({}))
      beforeEach(() => {
        mock.collection.mockReturnValue({
          doc: jest.fn().mockReturnValue({
            update: updateFunction
          })
        })
      })

      it('updateUserSettings should request cultureService changeLanguage function', (done) => {
        const changeLanguageSpy = jest.spyOn(cultureService, 'changeLanguage')

        service.updateUserSettings(userIdSut, userSettingsSut).subscribe(() => {
          expect(changeLanguageSpy).toHaveBeenCalledWith(userSettingsSut.language)
          done()
        })
      })

      it('updateUserSettings should request cultureService changeDarkMode function', (done) => {
        const changeDarkModeSpy = jest.spyOn(cultureService, 'changeDarkMode')

        service.updateUserSettings(userIdSut, userSettingsSut).subscribe(() => {
          expect(changeDarkModeSpy).toHaveBeenCalledWith(userSettingsSut.darkMode)
          done()
        })
      })

      it('updateUserSettings should return input userSettings', (done) => {
        service.updateUserSettings(userIdSut, userSettingsSut).subscribe((userSettings) => {
          expect(userSettings).toEqual(userSettingsSut)
          done()
        })
      })

      it('updateUserSettings should request set into Firebase collection', (done) => {
        service.updateUserSettings(userIdSut, userSettingsSut).subscribe(() => {
          expect(updateFunction).toHaveBeenCalledWith(userSettingsSut)
          done()
        })
      })
    })
  })
})
