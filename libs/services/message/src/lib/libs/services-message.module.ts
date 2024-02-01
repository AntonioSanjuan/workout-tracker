import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '@workout-tracker/ui';
import { MessageService } from '../message.service';

@NgModule({
  imports: [
    UiModule,
    CommonModule
  ],
  providers: [
    MessageService
  ]
})
export class LibsServicesMessageModule {}
