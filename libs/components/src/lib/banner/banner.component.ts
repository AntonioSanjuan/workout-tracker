import { Component, EventEmitter, Input, Output, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '@workout-tracker/ui';
import { BannerType } from '@workout-tracker/models';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'workout-tracker-banner',
  imports: [
    CommonModule,
    UiModule,
    TranslateModule
  ],
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class BannerComponent {
  @Input() public type: BannerType = BannerType.Info
  @Input() public title!: string;
  @Input() public content!: string;

  @Output() public action?: any  = new EventEmitter<void>();
  @Input() public actionText!: string

  public BannerType = BannerType

}
