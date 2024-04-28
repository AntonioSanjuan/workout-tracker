import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainingExerciseCardComponent } from './training-exercise-card.component';
import { ExerciseTemplate, MusclesInvolved, TrainingExercise, TrainingExerciseSerie } from '@workout-tracker/models';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';

describe('TrainingExerciseCardComponent', () => {
  const dummyTrainingExercise = {
    id: 'dummyTrainingExerciseId',
    exerciseTemplate: { 
      name: "exercise template name test", 
      musclesInvolved: [ MusclesInvolved.Calves],
      image: undefined, 
      creationDate: new Date()
    } as ExerciseTemplate,
    series: [
      {
        id: 'series0',
        weight: 10,
        repetitions: 11,
        observations: 'series0_obs'
      },
      {
        id: 'series1',
        weight: 20,
        repetitions: 21,
        observations: 'series1_obs'
      }
    ] as TrainingExerciseSerie[]
  } as TrainingExercise

  let component: TrainingExerciseCardComponent;
  let fixture: ComponentFixture<TrainingExerciseCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TrainingExerciseCardComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        }),]
    }).compileComponents();
    fixture = TestBed.createComponent(TrainingExerciseCardComponent);
    component = fixture.componentInstance;
    component.trainingExercise = dummyTrainingExercise
    fixture.detectChanges();
  });

  describe('Unit tests', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  })
});