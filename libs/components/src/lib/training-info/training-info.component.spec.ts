import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TrainingInfoComponent } from './training-info.component'
import { Training } from '@workout-tracker/models';
describe('TrainingInfoComponent', () => {
  const trainingSut = {} as Training

  let component: TrainingInfoComponent;
  let fixture: ComponentFixture<TrainingInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TrainingInfoComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        }),]
    }).compileComponents();
    fixture = TestBed.createComponent(TrainingInfoComponent);
    component = fixture.componentInstance;
    component.training = trainingSut
    fixture.detectChanges();
  });

  describe('Unit tests', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  })
});