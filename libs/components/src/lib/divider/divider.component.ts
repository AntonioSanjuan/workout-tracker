import { Component, EventEmitter, Input, Output, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '@workout-tracker/ui';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'workout-tracker-divider',
  imports: [
    CommonModule,
    UiModule,
    TranslateModule
  ],
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class DividerComponent {
  @Input() public content!: string;
}
