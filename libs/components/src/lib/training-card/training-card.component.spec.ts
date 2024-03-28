import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Exercise, MusclesInvolved, Training } from '@workout-tracker/models';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TrainingCardComponent } from './training-card.component'
describe('TrainingCardComponent', () => {
  const dummyTraining = { 
    observations: 'training observations',
    creationDate: new Date()
  } as Training;

  let component: TrainingCardComponent;
  let fixture: ComponentFixture<TrainingCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TrainingCardComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        }),]
    }).compileComponents();
    fixture = TestBed.createComponent(TrainingCardComponent);
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