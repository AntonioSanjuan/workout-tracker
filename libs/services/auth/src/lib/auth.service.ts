import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, from, of } from 'rxjs';
import { fetchAuthenticatedUserData, fetchAnonymousUserData } from '@workout-tracker/shared-store';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import firebase from 'firebase/compat/app/';
import { Router } from '@angular/router';
import { AppRoutes } from '@workout-tracker/models';

@Injectable({ providedIn: 'root'})
export class AuthService {
  private store: Store = inject(Store)
  private auth: AngularFireAuth = inject(AngularFireAuth)
  private router: Router = inject(Router)

  constructor() {
    this.credentialListener()
  }
  
  public logIn(userName: string, password: string): Observable<firebase.auth.UserCredential> {
    return from(this.auth.signInWithEmailAndPassword(userName, password))
  }

  public logOut() {
    return from(this.auth.signOut())
  }

  public signUp(userName: string, password: string): Observable<firebase.auth.UserCredential> {
    return from(this.auth.createUserWithEmailAndPassword(userName, password))
  }

  public isNewUser(userCredential: firebase.auth.UserCredential):boolean {
    return !!userCredential.additionalUserInfo?.isNewUser
  }

  private credentialListener() {
    this.auth.credential.subscribe((credentials: firebase.auth.UserCredential | null) => {
      if(credentials) {        
        //que cojones es esto
        const userCopy = JSON.parse(JSON.stringify(credentials.user));
        this.store.dispatch(fetchAuthenticatedUserData({ 
          user: userCopy, 
          isNewUser: !!credentials.additionalUserInfo?.isNewUser 
        }))
        this.router.navigate([AppRoutes.Home])
      } else {
        this.store.dispatch(fetchAnonymousUserData())
      }
    }) 
  }
}
