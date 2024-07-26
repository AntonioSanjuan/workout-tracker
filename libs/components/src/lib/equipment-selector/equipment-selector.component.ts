import { Component, EventEmitter, Input, Output, forwardRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import { UiModule } from '@workout-tracker/ui';
import { ExerciseEquipment } from '@workout-tracker/models';
import { TranslateModule } from '@ngx-translate/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'workout-tracker-equipment-selector',
  imports: [
    CommonModule,
    LetDirective,
    TranslateModule,
    UiModule
  ],
  templateUrl: './equipment-selector.component.html',
  styleUrls: ['./equipment-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EquipmentSelectorComponent),
      multi: true
    }
  ],
  standalone: true,
})
export class EquipmentSelectorComponent implements ControlValueAccessor {
  private fb = inject(FormBuilder);
  public equipments = ExerciseEquipment;

  @Input() public label!: string
  @Input() public errorLabel!: string
  @Input() public formControlName: string | number | null = 'formControlName';
  @Input() public formGroup: FormGroup<any> = this.fb.group({
    formControlName: null
  })
  @Output() private equipmentSelection = new EventEmitter<ExerciseEquipment>();

  value: any;
  onChange: any = () => { };
  onTouch: any = () => { };

  public selectEquipment(equipment: ExerciseEquipment) {
    this.equipmentSelection.emit(equipment)
  }

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }
}
