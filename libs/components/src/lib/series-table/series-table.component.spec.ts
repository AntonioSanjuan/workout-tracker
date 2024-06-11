import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { SeriesTableComponent } from './series-table.component'
import { ExerciseType, TrainingExerciseSerie } from '@workout-tracker/models';
describe('SeriesTableComponent', () => {
  let component: SeriesTableComponent;
  let fixture: ComponentFixture<SeriesTableComponent>;

  const dummySeries = [
    { id: 'dummySerie0', weight: 100, repetitions: 1, observations: 'obs_1'},
    { id: 'dummySerie1', weight: 200, repetitions: 2, observations: 'obs_2'},
    { id: 'dummySerie2', weight: 300, repetitions: 3, observations: 'obs_3'}
  ] as TrainingExerciseSerie[]
  const exerciseTypeSut = ExerciseType.Cardiovascular

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SeriesTableComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        }),]
    }).compileComponents();
    fixture = TestBed.createComponent(SeriesTableComponent);
    component = fixture.componentInstance;
    component.series = dummySeries
    component.exerciseType = exerciseTypeSut
    fixture.detectChanges();
  });

  describe('Unit tests', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  })

  describe('Integration tests', () => {
    describe('Delete TrainingExerciseSerie', () => {
      const trainingExerciseSerieSut = { id: 'trainingExerciseSerie delete test'} as TrainingExerciseSerie
      it('should emit delete output', () => {
        const deleteEmitSpy = jest.spyOn(component.delete, 'emit')
        component.deleteSerie(trainingExerciseSerieSut)

        expect(deleteEmitSpy).toHaveBeenCalledWith(trainingExerciseSerieSut)
      })
    })

    describe('Edit TrainingExerciseSerie', () => {
      const trainingExerciseSerieSut = { id: 'trainingExerciseSerie edit test'} as TrainingExerciseSerie
      it('should emit edit output', () => {
        const editEmitSpy = jest.spyOn(component.edit, 'emit')
        component.editSerie(trainingExerciseSerieSut)

        expect(editEmitSpy).toHaveBeenCalledWith(trainingExerciseSerieSut)
      })
    })
  })
});