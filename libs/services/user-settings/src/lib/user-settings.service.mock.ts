import { of } from 'rxjs'
import { UserSettingsService } from './user-settings.service';
import { UserSettings } from '@workout-tracker/models';

export const userSettingsServiceMock: Partial<UserSettingsService> = {
  setUserSettings: () => of({} as UserSettings),
  getUserSettings: () => of({} as UserSettings),
  getAnonymousSettings: () => of({} as UserSettings),
  updateAnonymousSettings: () => of({} as UserSettings),
  updateUserSettings: () => of({} as UserSettings)
}
