import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseLayoutComponent } from './base-layout.component';
import { RouterOutlet } from '@angular/router';
import { userStateMock } from '@workout-tracker/test';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AuthService } from '@workout-tracker/services/auth';
import { CultureService } from '@workout-tracker/services/culture';

describe('BaseLayoutComponent', () => {
  let component: BaseLayoutComponent;
  let fixture: ComponentFixture<BaseLayoutComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        AuthService,
        CultureService,
        provideMockStore({
          initialState: userStateMock
        }),
      ],
      imports: [
        RouterOutlet,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
        BaseLayoutComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseLayoutComponent);
    store = TestBed.inject(Store)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Unit tests', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  })
});
