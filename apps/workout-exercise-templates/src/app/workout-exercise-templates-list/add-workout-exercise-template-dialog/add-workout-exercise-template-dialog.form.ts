import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ExerciseType, MusclesInvolved } from "@workout-tracker/models";

export interface AddWorkoutExerciseTemplateForm {
  name: FormControl<string|null>
  musclesInvolved: FormControl<MusclesInvolved[]|null>
  type: FormControl<ExerciseType|null>
  observations: FormControl<string|null>
}
export const getAddWorkoutExerciseTemplateForm = () => {
  return new FormGroup<AddWorkoutExerciseTemplateForm>({
    name: new FormControl(null, [Validators.required]),
    musclesInvolved: new FormControl(null, [Validators.required, Validators.minLength(1)]),
    type: new FormControl(null, [Validators.required]),
    observations: new FormControl(null),
  });
}