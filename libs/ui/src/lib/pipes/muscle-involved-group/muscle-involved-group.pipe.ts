import { Pipe, PipeTransform } from '@angular/core';
import { MuscleGroups, MusclesInvolved, muscleInvolvedByGroups } from '@workout-tracker/models';


@Pipe({
  name: 'appMuscleInvolvedGroup',
  standalone: true
})
export class MuscleInvolvedGroupPipe implements PipeTransform {

  transform(muscle: MusclesInvolved): MuscleGroups | undefined {
    return Object.keys(muscleInvolvedByGroups).find(group => muscleInvolvedByGroups[group as MuscleGroups].includes(muscle)) as MuscleGroups | undefined;
  }
}