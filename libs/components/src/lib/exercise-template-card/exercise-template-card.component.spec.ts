import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExerciseTemplateCardComponent } from './exercise-template-card.component';
import { ExerciseTemplate, MusclesInvolved } from '@workout-tracker/models';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';

describe('ExerciseTemplateCardComponent', () => {
  const dummyExercise = { 
    name: "exercise template name test", 
    musclesInvolved: [ MusclesInvolved.Calves],
    image: undefined, 
    creationDate: new Date()
  } as ExerciseTemplate;

  let component: ExerciseTemplateCardComponent;
  let fixture: ComponentFixture<ExerciseTemplateCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ExerciseTemplateCardComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        }),]
    }).compileComponents();
    fixture = TestBed.createComponent(ExerciseTemplateCardComponent);
    component = fixture.componentInstance;
    component.exerciseTemplate = dummyExercise
    fixture.detectChanges();
  });

  describe('Unit tests', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  })
});