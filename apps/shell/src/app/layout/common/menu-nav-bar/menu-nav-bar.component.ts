import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiModule, collapseAnimation } from '@workout-tracker/ui';
import { AppRoutes } from '@workout-tracker/models'
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { getIsUserLogged, getMenuNavBarIsOpened, logOutRequest, switchNavBar } from '@workout-tracker/shared-store';
import { LetDirective } from '@ngrx/component';

@Component({
  selector: 'workout-tracker-menu-nav-bar',
  templateUrl: './menu-nav-bar.component.html',
  styleUrls: ['./menu-nav-bar.component.scss', './../menu.scss'],
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
    UiModule,
    LetDirective,
    RouterModule
  ],
  animations: [collapseAnimation]
})
export class MenuNavBarComponent {
  private store: Store = inject(Store)

  public appRoutes = AppRoutes

  public isUserLogged$ = this.store.select(getIsUserLogged)
  public navBarIsOpened$ = this.store.select(getMenuNavBarIsOpened)

  public switch() {
    this.store.dispatch(switchNavBar())
  }

  public logOut() {
    this.store.dispatch(logOutRequest())
  }
}
