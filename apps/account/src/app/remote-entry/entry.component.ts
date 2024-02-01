import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  standalone: true,
  imports: [CommonModule, NxWelcomeComponent],
  selector: 'workout-tracker-account-entry',
  template: `<workout-tracker-nx-welcome></workout-tracker-nx-welcome>`,
})
export class RemoteEntryComponent {}
