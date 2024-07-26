import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewEncapsulation, forwardRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import { MuscleGroupPillDirective, UiModule } from '@workout-tracker/ui';
import { MuscleGroups, MusclesInvolved, muscleInvolvedByGroups } from '@workout-tracker/models';
import { TranslateModule } from '@ngx-translate/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

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
export class MusclesSelectorComponent implements ControlValueAccessor, OnChanges {
  private fb = inject(FormBuilder);
  public musclesByGroup = muscleInvolvedByGroups;

  @Input() public filterMuscleGroups?: MuscleGroups[]
  @Input() public label!: string
  @Input() public errorLabel!: string
  @Input() public formControlName: string | number | null = 'formControlName';
  @Input() public formGroup: FormGroup<any> = this.fb.group({
    formControlName: null
  })
  @Output() private muscleSelection = new EventEmitter<MusclesInvolved>();

  value: any;
  onChange: any = () => { };
  onTouch: any = () => { };


  ngOnChanges(): void {
    this.musclesByGroup = this.filterMuscleGroups ? this.filterMuscleInvolvedByGroups() : muscleInvolvedByGroups
  }

  private filterMuscleInvolvedByGroups() {
    return (this.filterMuscleGroups) ?
      this.filterMuscleGroups.reduce((result, group) => {
        if (muscleInvolvedByGroups[group]) {
          result[group] = muscleInvolvedByGroups[group];
        }
        return result;
      }, {} as { [key in MuscleGroups]: MusclesInvolved[] }) :
      muscleInvolvedByGroups

  }

  public selectMuscle(muscle: MusclesInvolved) {
    this.muscleSelection.emit(muscle)
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
