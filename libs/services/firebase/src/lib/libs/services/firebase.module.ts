import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../../firebase.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    FirebaseService
  ]
})
export class LibsServicesFirebaseModule {}
