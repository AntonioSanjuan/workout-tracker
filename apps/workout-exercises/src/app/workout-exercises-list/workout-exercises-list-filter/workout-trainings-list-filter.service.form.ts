import { FormControl, FormGroup } from "@angular/forms";
import { MusclesInvolved } from "@workout-tracker/models";

export interface ExercisesListFilterForm {
  byName: FormControl<string | null>
  byMuscles: FormControl<MusclesInvolved[] | null>
}

export const exerciseListFilterForm = (): FormGroup<ExercisesListFilterForm> => new FormGroup<ExercisesListFilterForm>({
  byName: new FormControl(null),
  byMuscles: new FormControl([]),
})