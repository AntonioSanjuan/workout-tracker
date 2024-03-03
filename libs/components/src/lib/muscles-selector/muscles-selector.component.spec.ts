import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusclesSelectorComponent } from './muscles-selector.component';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MuscleGroups } from '@workout-tracker/models';

describe('MusclesSelectorComponent', () => {
  let component: MusclesSelectorComponent;
  let fixture: ComponentFixture<MusclesSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MusclesSelectorComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        }),]
    }).compileComponents();
    fixture = TestBed.createComponent(MusclesSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Unit tests', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  })
});