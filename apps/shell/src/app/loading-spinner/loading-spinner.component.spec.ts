import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingSpinnerComponent } from './loading-spinner.component';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { rootInitialState } from '../store/reducers';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

describe('LoadingSpinnerComponent', () => {
  let component: LoadingSpinnerComponent;
  let fixture: ComponentFixture<LoadingSpinnerComponent>;
  let store: Store;
  let translateService: TranslateService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoadingSpinnerComponent,
        TranslateModule.forRoot()
      ],
      providers: [
        provideMockStore({
          initialState: rootInitialState
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingSpinnerComponent);
    store = TestBed.inject(Store)
    translateService = TestBed.inject(TranslateService)

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Unit tests', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  })
});
