import { Directive, ElementRef, Input, SimpleChanges } from '@angular/core';
import { MuscleGroups } from '@workout-tracker/models';

const MuscleGroupColor: { [key in MuscleGroups]: string} = {
  [MuscleGroups.Arms] : '#FFFFFF',
  [MuscleGroups.Back] : '#FFFFFF',
  [MuscleGroups.Chest] : '#FFFFFF',
  [MuscleGroups.Legs] : '#FFFFFF',
  [MuscleGroups.Shoulder] : '#FFFFFF',
  [MuscleGroups.Core] : '#FFFFFF',
  [MuscleGroups.Cardio] : '#FFFFFF'
}
const MuscleGroupBackgroundColor: { [key in MuscleGroups]: string} = {
  [MuscleGroups.Arms] : '#73b0b9',
  [MuscleGroups.Back] : '#e7a1c7',
  [MuscleGroups.Chest] : '#e35b5b',
  [MuscleGroups.Legs] : '#80c184',
  [MuscleGroups.Shoulder] : '#8492d3',  //#e35b5b
  [MuscleGroups.Core] : '#f7a374',  //#e35b5b
  [MuscleGroups.Cardio] : '#b76a6a'
}

@Directive({
  selector: '[appMuscleGroupPill]',
  standalone: true
})
export class MuscleGroupPillDirective {
  @Input() muscleGroup?: MuscleGroups | string;

  constructor(private el: ElementRef<HTMLElement>) { }

  ngOnChanges(changes: SimpleChanges) {
    if(this.muscleGroup) {
      this.el.nativeElement.style.color = MuscleGroupColor[this.muscleGroup as keyof typeof MuscleGroupColor] || MuscleGroupColor.Arms;
      this.el.nativeElement.style.backgroundColor = MuscleGroupBackgroundColor[this.muscleGroup as keyof typeof MuscleGroupBackgroundColor] || MuscleGroupBackgroundColor.Arms;
    }
   }	

}