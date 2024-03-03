import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusclePillComponent } from './muscle-pill.component';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MuscleGroups } from '@workout-tracker/models';

describe('MusclePillComponent', () => {
  let dummyMuscleGroup = MuscleGroups.Back;

  let component: MusclePillComponent;
  let fixture: ComponentFixture<MusclePillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MusclePillComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        }),]
    }).compileComponents();
    fixture = TestBed.createComponent(MusclePillComponent);
    component = fixture.componentInstance;
    component.muscleGroup = dummyMuscleGroup
    fixture.detectChanges();
  });

  describe('Unit tests', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  })
});