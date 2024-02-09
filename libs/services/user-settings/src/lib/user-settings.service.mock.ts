import { of } from 'rxjs'
import { UserSettingsService } from './user-settings.service';
import { UserSettings } from '@workout-tracker/models';

export const userSettingsServiceMock: Partial<UserSettingsService> = {
  getUserSettings: () => of({} as UserSettings),
  setUserSettings: () => of({} as UserSettings),
}
