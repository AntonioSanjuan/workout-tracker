import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { SeriesTableComponent } from './series-table.component'
import { TrainingExerciseSerie } from '@workout-tracker/models';
describe('SeriesTableComponent', () => {
  let component: SeriesTableComponent;
  let fixture: ComponentFixture<SeriesTableComponent>;

  const dummySeries = [
    { id: 'dummySerie0', weight: 100, repetitions: 1, observations: 'obs_1'},
    { id: 'dummySerie1', weight: 200, repetitions: 2, observations: 'obs_2'},
    { id: 'dummySerie2', weight: 300, repetitions: 3, observations: 'obs_3'}
  ] as TrainingExerciseSerie[]

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
    fixture.detectChanges();
  });

  describe('Unit tests', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  })
});