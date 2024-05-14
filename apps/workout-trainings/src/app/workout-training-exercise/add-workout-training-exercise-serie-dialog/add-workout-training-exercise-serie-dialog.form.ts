import { FormControl, FormGroup, Validators } from "@angular/forms";

export interface AddWorkoutTrainingExerciseSerieForm {
  weight: FormControl<number|null>,
  repetitions: FormControl<number|null>,
  observations: FormControl<string|null>
}
export const getAddWorkoutTrainingExerciseSerieForm = () => {
  return new FormGroup<AddWorkoutTrainingExerciseSerieForm>({
    weight: new FormControl(null, [Validators.required, Validators.min(0)]),
    repetitions: new FormControl(null, [Validators.required, Validators.min(0)]),
    observations: new FormControl(null),
  });
}