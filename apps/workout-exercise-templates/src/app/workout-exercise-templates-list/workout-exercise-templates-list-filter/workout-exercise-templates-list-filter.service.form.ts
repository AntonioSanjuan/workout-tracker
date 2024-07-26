import { FormControl, FormGroup } from "@angular/forms";
import { ExerciseEquipment, MusclesInvolved } from "@workout-tracker/models";

export interface ExerciseTemplatesListFilterForm {
  byName: FormControl<string | null>
  byMuscles: FormControl<MusclesInvolved[] | null>
  byEquipment: FormControl<ExerciseEquipment[] | null>
}

export const exerciseTemplatesListFilterForm = (): FormGroup<ExerciseTemplatesListFilterForm> => new FormGroup<ExerciseTemplatesListFilterForm>({
  byName: new FormControl(null),
  byMuscles: new FormControl([]),
  byEquipment: new FormControl([]),
})