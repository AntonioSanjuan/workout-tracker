import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '@workout-tracker/ui';
import { BannerType } from '@workout-tracker/models';

@Component({
  selector: 'workout-tracker-banner',
  imports: [
    CommonModule,
    UiModule
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

  public BannerType = BannerType

}
