import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { setAnonymousUser, setAuthenticatedUser, setUserInfo } from '@workout-tracker/shared-store';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { distinctUntilChanged } from 'rxjs';
import { AppRoutes } from '@workout-tracker/models';

@Injectable({ providedIn: 'root'})
export class AuthPersistanceService {
  private store: Store = inject(Store)
  private auth: AngularFireAuth = inject(AngularFireAuth)
  private router: Router = inject(Router)

  public initialize() {
    this.auth.authState.pipe(distinctUntilChanged()).subscribe(
      (user) => {
        this.vitaminizedListener(user)
      })
  }

  private vitaminizedListener(user: firebase.User | null) {
    if(user) {
      this.store.dispatch(setAuthenticatedUser({ 
        user: Object.freeze(user), 
      }))
      this.router.navigate([AppRoutes.Home])
    }

    if(!user) {
      this.store.dispatch(setAnonymousUser())
    }
  }
}
