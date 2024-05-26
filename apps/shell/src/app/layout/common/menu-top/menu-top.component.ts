
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LetDirective } from '@ngrx/component';
import { AppRoutes } from '@workout-tracker/models';

@Component({
  selector: 'workout-tracker-menu-top',
  templateUrl: './menu-top.component.html',
  styleUrls: ['./menu-top.component.scss', './../menu.scss'],
  standalone: true,
  imports: [
    LetDirective,
    CommonModule,
    RouterModule,
    RouterModule
  ]
})
export class MenuTopComponent {
  public appRoutes = AppRoutes
}
