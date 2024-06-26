import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'workout-tracker-account',
  template: '<router-outlet></router-outlet>',
  styles: [':host { height: 100%; margin:auto }'],
  imports: [RouterOutlet],
  standalone: true
})
export class AppComponent {}
