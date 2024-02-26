import { Directive, ElementRef, Input, SimpleChanges } from '@angular/core';
import { ExerciseType } from '@workout-tracker/models';

const ExerciseColorByType: { [key in ExerciseType]: string} = {
  [ExerciseType.Arms] : '#ffffff',
  [ExerciseType.Back] : '#000000',
  [ExerciseType.Chest] : '#000000',
  [ExerciseType.Legs] : '#000000',
  [ExerciseType.Shoulder] : '#000000'
}
const ExerciseBackgroundColorByType: { [key in ExerciseType]: string} = {
  [ExerciseType.Arms] : '#007cae',
  [ExerciseType.Back] : '#00a6e1',
  [ExerciseType.Chest] : '#33b44a',
  [ExerciseType.Legs] : '#ff6921',
  [ExerciseType.Shoulder] : '#ffc20e'
}

@Directive({
  selector: '[appExerciseTypePill]',
  standalone: true
})
export class ExerciseTypePillDirective {
  @Input() type?: ExerciseType;

  constructor(private el: ElementRef<HTMLElement>) { }

  ngOnChanges(changes: SimpleChanges) {
    if(this.type) {
      this.el.nativeElement.style.color = ExerciseColorByType[this.type as keyof typeof ExerciseColorByType] || ExerciseColorByType.Arms;
      this.el.nativeElement.style.backgroundColor = ExerciseBackgroundColorByType[this.type as keyof typeof ExerciseBackgroundColorByType] || ExerciseBackgroundColorByType.Arms;
    }
   }	

}