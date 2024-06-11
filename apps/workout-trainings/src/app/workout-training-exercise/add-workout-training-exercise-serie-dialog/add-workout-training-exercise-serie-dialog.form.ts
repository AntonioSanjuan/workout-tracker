import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ExerciseType, TrainingExerciseSerie } from "@workout-tracker/models";

export interface AddWorkoutTrainingExerciseSerieForm {
  weight: FormControl<number|null>,
  repetitions: FormControl<number|null>,
  // distance: FormControl<number|null>,
  // duration: FormControl<number|null>,
  observations: FormControl<string|null>
}
export const getAddWorkoutTrainingExerciseSerieForm = (exerciseType: ExerciseType, lastSerie: TrainingExerciseSerie | undefined) => {
  return new FormGroup<AddWorkoutTrainingExerciseSerieForm>({
    weight: new FormControl(lastSerie?.weight ?? null, [Validators.min(0), ...exerciseType === ExerciseType.Strength ? [Validators.required] : []]),
    repetitions: new FormControl(lastSerie?.repetitions ?? null, [Validators.min(0), ...exerciseType === ExerciseType.Strength ? [Validators.required] : []]),

    // distance: new FormControl(lastSerie?.weight ?? null, [Validators.required, Validators.min(0)]),
    // duration: new FormControl(lastSerie?.repetitions ?? null, [Validators.required, Validators.min(0)]),

    observations: new FormControl(null),
  });
}