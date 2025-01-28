import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MuscleGroups, Training } from "@workout-tracker/models";

export interface WorkoutTrainingForm {
  muscleGroups: FormControl<MuscleGroups[] | null>
  observations: FormControl<string | null>
}

export const workoutTrainingForm = (training: Training | undefined) => {
  return new FormGroup<WorkoutTrainingForm>({
    muscleGroups: new FormControl(training?.muscleGroups || null, [Validators.required, Validators.minLength(1)]),
    observations: new FormControl(training?.observations || null)
  });
}

export const getTrainingFormValue = (form: FormGroup<WorkoutTrainingForm>): Partial<Training> => {
  const formRawValue = form.getRawValue();

  const trainingValue: Partial<Training> = {
    muscleGroups: formRawValue.muscleGroups || undefined,
    observations: formRawValue.observations || undefined
  } 
  return trainingValue
}
