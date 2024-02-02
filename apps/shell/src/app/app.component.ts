import { Component, OnInit, inject } from '@angular/core';
import { CultureService } from '@workout-tracker/services/culture';

@Component({
  selector: 'workout-tracker-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private cultureService: CultureService = inject(CultureService)

  ngOnInit(): void {
      this.cultureService.initialize()
  }
}
