import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Training } from '@workout-tracker/models';
import { TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TrainingCardComponent } from './training-card.component'
import { LocalizedDatePipe } from '@workout-tracker/ui';
import { DatePipe } from '@angular/common';
describe('TrainingCardComponent', () => {
  const dummyTraining = { 
    observations: 'training observations',
    creationDate: new Date()
  } as Training;

  let component: TrainingCardComponent;
  let fixture: ComponentFixture<TrainingCardComponent>;
  let translateService: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        LocalizedDatePipe,
        TrainingCardComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        }),],
        providers: [
          DatePipe,
        ]
    }).compileComponents();
    fixture = TestBed.createComponent(TrainingCardComponent);
    translateService = TestBed.inject(TranslateService);
    translateService.currentLang = 'en'
    component = fixture.componentInstance;
    component.training = dummyTraining
    fixture.detectChanges();
  });

  describe('Unit tests', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  })
});