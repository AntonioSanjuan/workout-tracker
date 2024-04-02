import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MuscleGroups } from "@workout-tracker/models";

export interface AddWorkoutTrainingForm {
  muscleGroups: FormControl<MuscleGroups[]|null>
  observations: FormControl<string|null>
}
export const getAddWorkoutTrainingForm = () => {
  return new FormGroup<AddWorkoutTrainingForm>({
    muscleGroups: new FormControl(null, [Validators.required, Validators.minLength(1)]),
    observations: new FormControl(null)
  });
}