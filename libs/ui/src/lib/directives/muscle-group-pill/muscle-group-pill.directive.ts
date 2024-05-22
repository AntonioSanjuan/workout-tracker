import { Directive, ElementRef, Input, SimpleChanges } from '@angular/core';
import { MuscleGroups } from '@workout-tracker/models';

const MuscleGroupColor: { [key in MuscleGroups]: string} = {
  [MuscleGroups.Arms] : '#ffffff',
  [MuscleGroups.Back] : '#000000',
  [MuscleGroups.Chest] : '#000000',
  [MuscleGroups.Legs] : '#000000',
  [MuscleGroups.Shoulder] : '#000000',
  [MuscleGroups.Core] : '#000000',
  [MuscleGroups.Cardio] : '#000000'
}
const MuscleGroupBackgroundColor: { [key in MuscleGroups]: string} = {
  [MuscleGroups.Arms] : '#007cae',
  [MuscleGroups.Back] : '#00a6e1',
  [MuscleGroups.Chest] : '#33b44a',
  [MuscleGroups.Legs] : '#ff6921',
  [MuscleGroups.Shoulder] : '#ffc20e',
  [MuscleGroups.Core] : '#21ffad',
  [MuscleGroups.Cardio] : 'red'
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