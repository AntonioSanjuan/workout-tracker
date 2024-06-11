import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CardiovascularTypeData, ExerciseType, StrengthTypeData, TrainingExerciseSerie } from "@workout-tracker/models";

export interface AddWorkoutTrainingExerciseSerieForm {
  data: FormGroup<AddWorkoutTrainingExerciseSerieDataForm>
  observations: FormControl<string|null>
}

export interface AddWorkoutTrainingExerciseSerieDataForm {
  weight: FormControl<number|null>,
  repetitions: FormControl<number|null>,
  speed: FormControl<number|null>,
  duration: FormControl<number|null>,
}
export const getAddWorkoutTrainingExerciseSerieForm = (exerciseType: ExerciseType, lastSerie: TrainingExerciseSerie | undefined) => {
  return new FormGroup<AddWorkoutTrainingExerciseSerieForm>({
    data: new FormGroup<AddWorkoutTrainingExerciseSerieDataForm>({
      weight: new FormControl((lastSerie?.data as StrengthTypeData)?.weight ?? null, [Validators.min(0), ...(exerciseType === ExerciseType.Strength ? [Validators.required] : [])]),
      repetitions: new FormControl((lastSerie?.data as StrengthTypeData)?.repetitions ?? null, [Validators.min(0), ...(exerciseType === ExerciseType.Strength ? [Validators.required] : [])]),

      speed: new FormControl((lastSerie?.data as CardiovascularTypeData)?.speed ?? null, [Validators.min(0), ...(exerciseType === ExerciseType.Cardiovascular ? [Validators.required] : [])]),
      duration: new FormControl((lastSerie?.data as CardiovascularTypeData)?.duration ?? null, [Validators.min(0), ...(exerciseType === ExerciseType.Cardiovascular ? [Validators.required] : [])]),
    }),

    observations: new FormControl(null),
  });
}