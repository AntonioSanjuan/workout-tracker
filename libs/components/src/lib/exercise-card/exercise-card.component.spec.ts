import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExerciseCard } from './exercise-card.component';
import { Exercise, MusclesInvolved } from '@workout-tracker/models';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';

describe('ExerciseCard', () => {
  let dummyExercise = { 
    name: "exercise name test", 
    musclesInvolved: [ MusclesInvolved.Calves],
    image: undefined, 
    creationDate: new Date()
  } as Exercise;

  let component: ExerciseCard;
  let fixture: ComponentFixture<ExerciseCard>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ExerciseCard,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        }),]
    }).compileComponents();
    fixture = TestBed.createComponent(ExerciseCard);
    component = fixture.componentInstance;
    component.exercise = dummyExercise
    fixture.detectChanges();
  });

  describe('Unit tests', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  })
});