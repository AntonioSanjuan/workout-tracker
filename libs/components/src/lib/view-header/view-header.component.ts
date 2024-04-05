import { Component, Input, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '@workout-tracker/ui';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { getPrevRoute } from '@workout-tracker/shared-store';
import { LetDirective } from '@ngrx/component';

@Component({
  selector: 'workout-tracker-view-header',
  imports: [
    CommonModule,
    LetDirective,
    UiModule
  ],
  templateUrl: './view-header.component.html',
  styleUrls: ['./view-header.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class ViewHeaderComponent {
  private router: Router = inject(Router)

  @Input() public title!: string;
  @Input() public goBackUrl?: string

  public goBack() {
    if(this.goBackUrl) {
      this.router.navigate([this.goBackUrl])
    }
  }
}
