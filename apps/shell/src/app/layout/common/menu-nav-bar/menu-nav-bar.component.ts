import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UiModule } from '@workout-tracker/ui';
import { AppRoutes } from '@workout-tracker/models'
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'workout-tracker-menu-nav-bar',
  templateUrl: './menu-nav-bar.component.html',
  styleUrls: ['./menu-nav-bar.component.scss', './../menu.scss'],
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
    UiModule,
    RouterModule
  ]
})
export class MenuNavBarComponent {
  public appRoutes = AppRoutes
}
