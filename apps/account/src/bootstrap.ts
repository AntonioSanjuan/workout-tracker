import { bootstrapApplication } from '@angular/platform-browser'
import { AppComponent } from './app/app.component';
import { CommonModule } from '@angular/common';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router'
import { appRoutes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [CommonModule, importProvidersFrom(RouterModule.forRoot(appRoutes))]
})
