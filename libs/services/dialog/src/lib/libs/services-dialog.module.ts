import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '@workout-tracker/ui';
import { DialogService } from '../dialog.service';

@NgModule({
  imports: [
    UiModule,
    CommonModule
  ],
  providers: [
    DialogService
  ]
})
export class LibsServicesDialogModule {}
