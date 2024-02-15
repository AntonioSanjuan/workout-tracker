import { FormGroup, FormControl } from "@angular/forms";
import { UserSettings } from "@workout-tracker/models";

export interface SettingsForm {
  language: FormControl<string|null>
  darkMode: FormControl<boolean|null>
}

export const settingsForm = (settings: UserSettings|undefined): FormGroup<SettingsForm> => new FormGroup<SettingsForm>({
  language: new FormControl<string|null>(settings?.language || null),
  darkMode: new FormControl<boolean|null>(settings?.darkMode || null)
})