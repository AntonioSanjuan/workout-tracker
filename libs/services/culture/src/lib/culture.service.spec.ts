import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { CultureService } from './culture.service';
import { LibsServicesCultureModule } from './libs/services/culture.module';
import { TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { AppInit, loadedApp } from '@workout-tracker/shared-store';

describe('CultureService', () => {
  let service: CultureService;
  let store: Store;
  let translateService: TranslateService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ 
        TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: TranslateFakeLoader}
        })
     ],
      providers: [
        CultureService,
        provideMockStore({
          initialState: {}
        })
      ]
    });
    translateService = TestBed.inject(TranslateService)
    service = TestBed.inject(CultureService);
    store = TestBed.inject(Store)
  });

  describe('Unit tests', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  })

  describe('Integration tests', () => {
    it('initialize should set setDefaultLang "ES-ES"', () => {
      const langSut = "ES-ES"
      const setDefaultLangSpy = jest.spyOn(translateService, "setDefaultLang")
  
      service.initialize()
  
      expect(setDefaultLangSpy).toHaveBeenCalledWith(langSut)
    });

    it('initialize should set addLangs', () => {
      const addLangsSpy = jest.spyOn(translateService, "addLangs")
  
      service.initialize()
  
      expect(addLangsSpy).toHaveBeenCalled()
    });

    it('changeLanguage should use default language (ES-ES) if language its not supported', () => {
      const langSut = 'unsupported lang';
      const defaultLang = 'ES-ES';
  
      const useSpy = jest.spyOn(translateService, 'use').mockReturnValue(of(undefined))
  
      service.changeLanguage(langSut)
  
      expect(useSpy).not.toHaveBeenCalledWith(langSut)
      expect(useSpy).toHaveBeenCalledWith(defaultLang)
    });

    it('changeLanguage should set language if its supported', () => {
      const langSut = 'EN-GB';
  
      const useSpy = jest.spyOn(translateService, 'use').mockReturnValue(of(undefined))
  
      service.changeLanguage(langSut)
  
      expect(useSpy).toHaveBeenCalledWith(langSut)
    });

    it('changeLanguage should dispatch loadedApp UI', () => {
      const langSut = 'EN-GB';

      const dispatchSpy = jest.spyOn(store, "dispatch")
      jest.spyOn(translateService, 'use').mockReturnValue(of(undefined))
  
      service.changeLanguage(langSut)
  
      expect(dispatchSpy).toHaveBeenCalledWith(loadedApp({ initialized: AppInit.UI }))
    });
  
    it('getBrowserLanguage should return default language (ES-ES) if browser language its UNDEFINED', () => {
      const undefinedLangSut = undefined;
      const defaultLang = 'ES-ES';
  
      jest.spyOn(translateService, "getBrowserCultureLang").mockReturnValue(undefinedLangSut)
  
      const browserLanguageSut = service.getBrowserLanguage();
  
      expect(browserLanguageSut).toEqual(defaultLang)
    });

    it('getBrowserLanguage should return browser language if exists', () => {
      const browserLang = 'ES-ES';
  
      jest.spyOn(translateService, "getBrowserCultureLang").mockReturnValue(browserLang)
  
      const browserLanguageSut = service.getBrowserLanguage();
  
      expect(browserLanguageSut).toEqual(browserLang)
    });
  

  })
});
