import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSettingsService } from '../user-settings.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    UserSettingsService
  ]
})
export class LibsServicesUserSettingsModule {}
