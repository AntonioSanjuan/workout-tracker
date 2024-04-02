import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MuscleGroups } from '@workout-tracker/models';
import { MusclesGroupsSelectorComponent } from './muscle-groups-selector.component'
describe('MusclesGroupsSelectorComponent', () => {
  let component: MusclesGroupsSelectorComponent;
  let fixture: ComponentFixture<MusclesGroupsSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MusclesGroupsSelectorComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        }),]
    }).compileComponents();
    fixture = TestBed.createComponent(MusclesGroupsSelectorComponent);
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
      const mnuscleGroupSut = MuscleGroups.Arms
      const emitSpy = jest.spyOn(component, 'selectMuscle')
      component.selectMuscle(mnuscleGroupSut);

      expect(emitSpy).toHaveBeenCalledWith(mnuscleGroupSut)
    });
  })
});