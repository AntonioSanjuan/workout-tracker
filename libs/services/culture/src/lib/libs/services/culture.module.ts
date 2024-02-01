import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CultureService } from '../../culture.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    CultureService
  ]
})
export class LibsServicesCultureModule {}
