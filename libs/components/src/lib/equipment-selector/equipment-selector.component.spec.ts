import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EquipmentSelectorComponent } from './equipment-selector.component';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ExerciseEquipment } from '@workout-tracker/models';

describe('EquipmentSelectorComponent', () => {
  let component: EquipmentSelectorComponent;
  let fixture: ComponentFixture<EquipmentSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        EquipmentSelectorComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        }),]
    }).compileComponents();
    fixture = TestBed.createComponent(EquipmentSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Unit tests', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  })

  describe('Integration tests', () => {
    it('selectEquipment should emit equipmentSelection', () => {
      const equipmentSut = ExerciseEquipment.Barbel
      const emitSpy = jest.spyOn(component, 'selectEquipment')
      component.selectEquipment(equipmentSut);

      expect(emitSpy).toHaveBeenCalledWith(equipmentSut)
    });
  })
});