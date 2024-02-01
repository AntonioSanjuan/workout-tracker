import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiModule } from '@workout-tracker/ui';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { AuthService } from '@workout-tracker/services/auth';
import { CultureService } from '@workout-tracker/services/culture';
import { getIsUserLogged } from '@workout-tracker/shared-store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'workout-tracker-profile-nav-bar',
  templateUrl: './profile-nav-bar.component.html',
  styleUrls: ['./profile-nav-bar.component.scss', './../menu.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,  // *** This line disables the view encapsulation
  imports: [
    TranslateModule,
    LetDirective,
    CommonModule,
    UiModule,
    RouterModule
  ]
})
export class ProfileNavBarComponent {
  private authService: AuthService = inject(AuthService)
  private cultureService: CultureService = inject(CultureService);
  public translateService: TranslateService = inject(TranslateService)

  private store: Store = inject(Store);

  public isUserLogged$ = this.store.select(getIsUserLogged)

  public logOut() {
    this.authService.logOut();
  }

  public changeLanguage(lang: string) {
    console.log("lang", lang)
    this.cultureService.changeLanguage(lang)
  }
}
