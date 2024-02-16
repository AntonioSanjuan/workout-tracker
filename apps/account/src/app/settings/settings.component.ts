import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { SettingsForm, settingsForm } from './settings.form';
import { FormGroup } from "@angular/forms";
import { UiModule } from '@workout-tracker/ui';
import { getUserSettings, setUserData, updateUserSettings } from '@workout-tracker/shared-store'
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppRoutes, UserSettings } from '@workout-tracker/models'
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'workout-tracker-settings',
  templateUrl: './settings.component.html',
  imports: [
    UiModule,
    TranslateModule,
  ],
  styleUrls: ['./settings.component.scss'],
  standalone: true
})
export class SettingsComponent implements OnInit, OnDestroy {
  private store = inject(Store)
  public translateService: TranslateService = inject(TranslateService)

  public settingsForm!: FormGroup<SettingsForm>
  
  public appRoutes = AppRoutes

  public userSettings$ = this.store.select(getUserSettings)
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.userSettings$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((userSettings: UserSettings|undefined) => {
      this.settingsForm = settingsForm(userSettings)
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  updateSettings(): void {
    console.log("eeeepa")
    const settingsData = {...this.settingsForm?.getRawValue() } as UserSettings
    this.store.dispatch(updateUserSettings({ userSettings: settingsData}))
  }
}
