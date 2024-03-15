import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MusclesInvolved } from "@workout-tracker/models";

export interface AddWorkoutExerciseForm {
  name: FormControl<string|null>
  musclesInvolved: FormControl<MusclesInvolved[]|null>
  observations: FormControl<string|null>
}
export const getAddWorkoutExerciseForm = () => {
  return new FormGroup<AddWorkoutExerciseForm>({
    name: new FormControl(null, [Validators.required]),
    musclesInvolved: new FormControl(null, [Validators.required, Validators.minLength(1)]),
    observations: new FormControl(null)
  });
}