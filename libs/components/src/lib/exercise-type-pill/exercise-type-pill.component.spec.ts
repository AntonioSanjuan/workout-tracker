import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseTypePillComponent } from './exercise-type-pill.component';
import { ExerciseType } from '@workout-tracker/models';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';

describe('ExerciseTypePillComponent', () => {
  let dummyExerciseType = ExerciseType.Arms;

  let component: ExerciseTypePillComponent;
  let fixture: ComponentFixture<ExerciseTypePillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ExerciseTypePillComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        }),]
    }).compileComponents();
    fixture = TestBed.createComponent(ExerciseTypePillComponent);
    component = fixture.componentInstance;
    component.exerciseType = dummyExerciseType
    fixture.detectChanges();
  });

  describe('Unit tests', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  })
});