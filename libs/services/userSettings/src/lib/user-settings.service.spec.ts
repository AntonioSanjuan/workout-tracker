import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { UserSettingsService } from './user-settings.service';
import { LibsServicesUserSettingsModule } from './libs/services/ser-settings.module';
import { TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { AppInit, loadedApp } from '@workout-tracker/shared-store';

describe('UserSettingsService', () => {
  let service: UserSettingsService;
  let store: Store;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ 
        LibsServicesUserSettingsModule,
     ],
      providers: [
        provideMockStore({
          initialState: {}
        })
      ]
    });
    service = TestBed.inject(UserSettingsService);
    store = TestBed.inject(Store)
  });

  describe('Unit tests', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  })
});
