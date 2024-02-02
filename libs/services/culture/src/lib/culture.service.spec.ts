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
        LibsServicesCultureModule,
        TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: TranslateFakeLoader}
        })
     ],
      providers: [
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
    it('setLanguage should use browser language if its supported', () => {
      const langSut = 'EN-GB'
      jest.spyOn(translateService, "getBrowserCultureLang").mockReturnValue(langSut)
      const useSpy = jest.spyOn(translateService, 'use').mockReturnValue(of(undefined))
  
      service.setLanguage()
  
      expect(useSpy).toHaveBeenCalledWith(langSut)
    });
  
    it('setLanguage should use default language (ES-ES) if browser language its not supported', () => {
      const langSut = 'unsupported lang';
      const defaultLang = 'ES-ES';
  
      jest.spyOn(translateService, "getBrowserCultureLang").mockReturnValue(langSut)
      const useSpy = jest.spyOn(translateService, 'use').mockReturnValue(of(undefined))
  
      service.setLanguage()
  
      expect(useSpy).not.toHaveBeenCalledWith(langSut)
      expect(useSpy).toHaveBeenCalledWith(defaultLang)
    });
  
    it('setLanguage should use default language (ES-ES) if browser language its UNDEFINED', () => {
      const undefinedLangSut = undefined;
      const defaultLang = 'ES-ES';
  
      jest.spyOn(translateService, "getBrowserCultureLang").mockReturnValue(undefinedLangSut)
      const useSpy = jest.spyOn(translateService, 'use').mockReturnValue(of(undefined))
  
      service.setLanguage();
  
      expect(useSpy).not.toHaveBeenCalledWith(undefinedLangSut)
      expect(useSpy).toHaveBeenCalledWith(defaultLang)
    });
  
    it('setLanguage should dispatch loadedApp UI', () => {
      const dispatchSpy = jest.spyOn(store, "dispatch")
      jest.spyOn(translateService, 'use').mockReturnValue(of(undefined))
  
      service.setLanguage()
  
      expect(dispatchSpy).toHaveBeenCalledWith(loadedApp({ initialized: AppInit.UI }))
    });
  })
});
