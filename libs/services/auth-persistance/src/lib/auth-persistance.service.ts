import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { setAnonymousUser, setAuthenticatedUser, setUserInfo } from '@workout-tracker/shared-store';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { AppRoutes } from '@workout-tracker/models';
import {combineLatest, distinctUntilChanged } from 'rxjs';

@Injectable({ providedIn: 'root'})
export class AuthPersistanceService {
  private store: Store = inject(Store)
  private auth: AngularFireAuth = inject(AngularFireAuth)
  private router: Router = inject(Router)

  private user$ = this.auth.authState

  public initialize() {
    this.user$.pipe(distinctUntilChanged()).subscribe(
      (user) => {
        console.log([user])
        this.vitaminizedListener(user)
      })
  }

  private vitaminizedListener(user: firebase.User | null) {
    if(user) {
      const userCopy = JSON.parse(JSON.stringify(user));
      this.store.dispatch(setAuthenticatedUser({ 
        user: userCopy, 
      }))
      this.router.navigate([AppRoutes.Home])
    }

    if(!user) {
      this.store.dispatch(setAnonymousUser())
    }
  }
}
