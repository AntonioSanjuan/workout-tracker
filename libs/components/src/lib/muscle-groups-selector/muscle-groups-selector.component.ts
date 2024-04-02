import { Component, EventEmitter, Input, Output, ViewEncapsulation, forwardRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import { MuscleGroupPillDirective, UiModule } from '@workout-tracker/ui';
import { MuscleGroups, MusclesInvolved, muscleInvolvedByGroups } from '@workout-tracker/models';
import { TranslateModule } from '@ngx-translate/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'workout-tracker-muscle-groups-selector',
  imports: [
    CommonModule,
    LetDirective,
    MuscleGroupPillDirective,
    TranslateModule,
    UiModule
  ],
  templateUrl: './muscle-groups-selector.component.html',
  styleUrls: ['./muscle-groups-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MusclesGroupsSelectorComponent),
      multi: true
    }
  ],
  standalone: true,
})
export class MusclesGroupsSelectorComponent implements ControlValueAccessor{
  private fb = inject(FormBuilder);
  public muscleGroups = MuscleGroups;

  @Input() public label!: string
  @Input() public errorLabel!: string
  @Input() public formControlName: string | number | null = 'formControlName';
  @Input() public formGroup: FormGroup<any> = this.fb.group({
    formControlName: null
  })
  @Output() private muscleGroupSelection = new EventEmitter<MuscleGroups>();

  value: any;
  onChange: any = () => {};
  onTouch: any = () => {};

  public selectMuscle(muscleGroup: MuscleGroups) {
    this.muscleGroupSelection.emit(muscleGroup)
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
