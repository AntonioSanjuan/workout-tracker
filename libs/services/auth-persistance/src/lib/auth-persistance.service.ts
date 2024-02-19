import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { setAnonymousUser, setAuthenticatedUser } from '@workout-tracker/shared-store';
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
  private credentials$ = this.auth.credential

  public initialize() {
    combineLatest([this.user$, this.credentials$]).pipe(distinctUntilChanged()).subscribe(
      ([user, credentials]) => {
        console.log([user, credentials])
        this.vitaminizedListener(user, credentials)
      })
  }
  
  private isNewUser(userCredential: firebase.auth.UserCredential|null):boolean {
    return !!userCredential?.additionalUserInfo?.isNewUser
  }

  private vitaminizedListener(user: firebase.User | null, credential: firebase.auth.UserCredential | null) {
    if(user) {
      const userCopy = JSON.parse(JSON.stringify(user));
      this.store.dispatch(setAuthenticatedUser({ 
        user: userCopy, 
        isNewUser: this.isNewUser(credential)
      }))
      this.router.navigate([AppRoutes.Home])
    }

    if(!user) {
      this.store.dispatch(setAnonymousUser())
    }
  }
}
