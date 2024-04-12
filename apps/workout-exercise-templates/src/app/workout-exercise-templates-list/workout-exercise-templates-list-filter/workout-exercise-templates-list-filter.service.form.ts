import { FormControl, FormGroup } from "@angular/forms";
import { MusclesInvolved } from "@workout-tracker/models";

export interface ExerciseTemplatesListFilterForm {
  byName: FormControl<string | null>
  byMuscles: FormControl<MusclesInvolved[] | null>
}

export const exerciseTemplatesListFilterForm = (): FormGroup<ExerciseTemplatesListFilterForm> => new FormGroup<ExerciseTemplatesListFilterForm>({
  byName: new FormControl(null),
  byMuscles: new FormControl([]),
})