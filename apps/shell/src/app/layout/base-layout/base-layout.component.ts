import { Component, inject } from '@angular/core';
import { MenuTopComponent } from '../common/menu-top/menu-top.component';
import { MenuBottomComponent } from '../common/menu-bottom/menu-bottom.component';
import { RouterOutlet } from '@angular/router';
import { MenuNavBarComponent } from '../common/menu-nav-bar/menu-nav-bar.component';
import { ProfileNavBarComponent } from '../common/profile-nav/profile-nav-bar.component';
import { opacityAnimation } from '@workout-tracker/ui';
import { getMenuNavBarIsOpened } from '@workout-tracker/shared-store';
import { Store } from '@ngrx/store';
import { LetDirective } from '@ngrx/component';

@Component({
  selector: 'workout-tracker-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss'],
  imports: [
    RouterOutlet,
    MenuBottomComponent,
    MenuTopComponent,
    MenuNavBarComponent,
    ProfileNavBarComponent,
    LetDirective
  ],
  animations: [opacityAnimation],
  standalone: true
})
export class BaseLayoutComponent {
  private store: Store = inject(Store)
  public navBarIsOpened$ = this.store.select(getMenuNavBarIsOpened)

}
