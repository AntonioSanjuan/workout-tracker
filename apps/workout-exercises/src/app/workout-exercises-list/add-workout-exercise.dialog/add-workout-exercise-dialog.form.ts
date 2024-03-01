import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ExerciseType, MusclesInvolved } from "@workout-tracker/models";

export interface AddWorkoutExerciseForm {
  name: FormControl<string|null>
  types: FormControl<ExerciseType[]|null>
  musclesInvolved: FormControl<MusclesInvolved[]|null>
}
export const getAddWorkoutExerciseForm = () => {
  return new FormGroup<AddWorkoutExerciseForm>({
    name: new FormControl(null, [Validators.required]),
    types: new FormControl(null, [Validators.required, Validators.minLength(1)]),
    musclesInvolved: new FormControl(null, [Validators.required, Validators.minLength(1)]),
  });
}