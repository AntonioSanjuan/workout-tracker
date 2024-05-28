import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ExerciseTemplateInfoComponent } from './exercise-template-info.component'
import { ExerciseTemplate } from '@workout-tracker/models';
describe('ExerciseTemplateInfoComponent', () => {
  const exerciseTemplateSut = {} as ExerciseTemplate

  let component: ExerciseTemplateInfoComponent;
  let fixture: ComponentFixture<ExerciseTemplateInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ExerciseTemplateInfoComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        }),]
    }).compileComponents();
    fixture = TestBed.createComponent(ExerciseTemplateInfoComponent);
    component = fixture.componentInstance;
    component.exerciseTemplate = exerciseTemplateSut
    fixture.detectChanges();
  });

  describe('Unit tests', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  })
});