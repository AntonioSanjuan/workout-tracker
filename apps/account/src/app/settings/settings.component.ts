import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { SettingsForm, settingsForm } from './settings.form';
import { FormGroup } from "@angular/forms";
import { UiModule } from '@workout-tracker/ui';
import { getUser, getUserSettings, updateUserSettingsRequest } from '@workout-tracker/shared-store'
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppRoutes, BannerType, UserSettings } from '@workout-tracker/models'
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { BannerComponent } from '@workout-tracker/components';

@Component({
  selector: 'workout-tracker-settings',
  templateUrl: './settings.component.html',
  imports: [
    UiModule,
    TranslateModule,
    BannerComponent
  ],
  styleUrls: ['./settings.component.scss'],
  standalone: true
})
export class SettingsComponent implements OnInit, OnDestroy {
  private store = inject(Store)
  private router = inject(Router)
  public translateService: TranslateService = inject(TranslateService)

  public settingsForm!: FormGroup<SettingsForm>

  public appRoutes = AppRoutes
  public bannerType = BannerType;

  public userSettings$ = this.store.select(getUserSettings)
  public user$ = this.store.select(getUser)
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.userSettings$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((userSettings: UserSettings | undefined) => {
      this.settingsForm = settingsForm(userSettings)
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  goToSignUp(): void {
    this.router.navigate([AppRoutes.SignUp])
  }

  updateSettings(): void {
    const settingsData = { ...this.settingsForm?.getRawValue() } as UserSettings
    this.store.dispatch(updateUserSettingsRequest({ userSettings: settingsData }))
  }
}
