import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MusclesSelectorComponent } from './muscles-selector.component';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MusclesInvolved } from '@workout-tracker/models';

describe('MusclesSelectorComponent', () => {
  let component: MusclesSelectorComponent;
  let fixture: ComponentFixture<MusclesSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
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

  describe('Integration tests', () => {
    it('selectMuscle should emit muscleSelection', () => {
      const mnuscleSut = MusclesInvolved.Calves
      const emitSpy = jest.spyOn(component, 'selectMuscle')
      component.selectMuscle(mnuscleSut);

      expect(emitSpy).toHaveBeenCalledWith(mnuscleSut)
    });
  })
});