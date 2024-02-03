import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiModule, collapseAnimation } from '@workout-tracker/ui';
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
  ],
  animations: [collapseAnimation]
})
export class MenuNavBarComponent {
  @ViewChild("list", { static: false }) list!: ElementRef;

  public appRoutes = AppRoutes
  public collapsed = true;

  public switch() {
    this.collapsed = !this.collapsed
  }

  public appear() {
    console.log("epa")
  }
}
