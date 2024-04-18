import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ExerciseTemplate } from "@workout-tracker/models";

export interface AddWorkoutTrainingExerciseForm {
  exerciseTemplate: FormControl<ExerciseTemplate|null>
}
export const getAddWorkoutTrainingExerciseForm = () => {
  return new FormGroup<AddWorkoutTrainingExerciseForm>({
    exerciseTemplate: new FormControl(null, [Validators.required]),
  });
}