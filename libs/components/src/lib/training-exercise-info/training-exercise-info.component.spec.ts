import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TrainingExerciseInfoComponent } from './training-exercise-info.component'
import { ExerciseTemplate, ExerciseType, TrainingExercise } from '@workout-tracker/models';
describe('TrainingExerciseInfoComponent', () => {
  const trainingExerciseSut = { 
    series: [], 
    exerciseTemplate: { 
      type: ExerciseType.Cardiovascular 
    } as ExerciseTemplate
  } as Partial<TrainingExercise>

  let component: TrainingExerciseInfoComponent;
  let fixture: ComponentFixture<TrainingExerciseInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TrainingExerciseInfoComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        }),]
    }).compileComponents();
    fixture = TestBed.createComponent(TrainingExerciseInfoComponent);
    component = fixture.componentInstance;
    component.trainingExercise = trainingExerciseSut as TrainingExercise
    fixture.detectChanges();
  });

  describe('Unit tests', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  })
});