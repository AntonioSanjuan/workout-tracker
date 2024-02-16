import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { fetchAuthenticatedUserData, fetchAnonymousUserData } from '@workout-tracker/shared-store';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import firebase from 'firebase/compat/app/';
import { Router } from '@angular/router';
import { AppRoutes } from '@workout-tracker/models';
import { distinctUntilChanged } from 'rxjs';

@Injectable({ providedIn: 'root'})
export class AuthPersistanceService {
  private store: Store = inject(Store)
  private auth: AngularFireAuth = inject(AngularFireAuth)
  private router: Router = inject(Router)

  public initialize() {
    this.credentialListener()
  }
  
  private isNewUser(userCredential: firebase.auth.UserCredential):boolean {
    return !!userCredential.additionalUserInfo?.isNewUser
  }

  private credentialListener() {
    this.auth.credential.pipe(distinctUntilChanged())
    .subscribe((credentials: firebase.auth.UserCredential | null) => {
      if(credentials) {        
        //que cojones es esto
        const userCopy = JSON.parse(JSON.stringify(credentials.user));
        this.store.dispatch(fetchAuthenticatedUserData({ 
          user: userCopy, 
          isNewUser: this.isNewUser(credentials)
        }))
        this.router.navigate([AppRoutes.Home])
      } else {
        this.store.dispatch(fetchAnonymousUserData())
      }
    }) 
  }
}
