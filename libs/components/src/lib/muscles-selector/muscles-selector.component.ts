import { Component, Input, ViewEncapsulation, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import { MuscleGroupPillDirective, UiModule } from '@workout-tracker/ui';
import { muscleInvolvedByGroups } from '@workout-tracker/models';
import { TranslateModule } from '@ngx-translate/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'workout-tracker-muscles-selector',
  imports: [
    CommonModule,
    LetDirective,
    MuscleGroupPillDirective,
    TranslateModule,
    UiModule
  ],
  templateUrl: './muscles-selector.component.html',
  styleUrls: ['./muscles-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MusclesSelectorComponent),
      multi: true
    }
  ],
  standalone: true,
})
export class MusclesSelectorComponent implements ControlValueAccessor{
  @Input() public label!: string
  @Input() public errorLabel!: string
  @Input() public formControlName: string | number | null = null;
  @Input() public formGroup: FormGroup<any> = new FormGroup({});
  value: any;
  onChange: any = () => {};
  onTouch: any = () => {};
  public musclesByGroup = muscleInvolvedByGroups;

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
