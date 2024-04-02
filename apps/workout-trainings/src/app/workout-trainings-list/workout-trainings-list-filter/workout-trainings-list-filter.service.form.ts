import { FormControl, FormGroup } from "@angular/forms";
import { MuscleGroups } from "@workout-tracker/models";

export interface TrainingsListFilterForm {
  fromDate: FormControl<Date | null>
  toDate: FormControl<Date | null>
  muscleGroups: FormControl<MuscleGroups[] | null>
}

export const trainingsListFilterForm = (): FormGroup<TrainingsListFilterForm> => new FormGroup<TrainingsListFilterForm>({
  fromDate: new FormControl(null),
  toDate: new FormControl(null),
  muscleGroups: new FormControl([]),
})