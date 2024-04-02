import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CultureService } from '@workout-tracker/services/culture';
import { TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Actions } from '@ngrx/effects';
import { AuthPersistanceService, authPersistanceServiceMock } from '@workout-tracker/services/auth-persistance';
import { DateAdapter } from '@angular/material/core';

describe('AppComponent', () => {
  let cultureService: CultureService;
  let authPersistanceService: AuthPersistanceService;
  let actions: Observable<Action>;
  let router: Router;
  let store: Store;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        { provide: AuthPersistanceService, useValue: authPersistanceServiceMock },
        CultureService,
        provideMockActions(() => actions),
        provideMockStore({
          initialState: {}
        }),
        DateAdapter
      ]
    }).compileComponents();

    cultureService = TestBed.inject(CultureService);
    authPersistanceService = TestBed.inject(AuthPersistanceService)
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
    actions = TestBed.inject(Actions);
  });

  describe('Unit tests', () => {
    it('should create the app', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app).toBeTruthy();
    });
  })

  describe('Integration tests', () => {
    it('should request cultureService initialize into onInit', () => {
      const initializeSpy = jest.spyOn(cultureService, 'initialize')
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      app.ngOnInit();
      
      expect(initializeSpy).toHaveBeenCalled()
    });

    it('should request authPersistanceService initialize into onInit', () => {
      const initializeSpy = jest.spyOn(authPersistanceService, 'initialize')
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      app.ngOnInit();
      
      expect(initializeSpy).toHaveBeenCalled()
    });
  })
});