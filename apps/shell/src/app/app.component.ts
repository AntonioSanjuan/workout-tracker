import { Component, OnInit, inject } from '@angular/core';
import { AuthPersistanceService } from '@workout-tracker/services/auth-persistance';
import { CultureService } from '@workout-tracker/services/culture';

@Component({
  selector: 'workout-tracker-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private cultureService: CultureService = inject(CultureService)
  // private authPersistanceService: AuthPersistanceService = inject(AuthPersistanceService)

  constructor() {
    console.log("ey")
  }
  ngOnInit(): void {
      this.cultureService.initialize()
      // this.authPersistanceService.initialize()
  }
}
