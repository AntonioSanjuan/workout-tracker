import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, from, of } from 'rxjs';
import { setUserData, unsetUserData } from '@workout-tracker/shared-store';
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
    this.authStateListener()
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

  private authStateListener() {
    this.auth.authState.subscribe((user: firebase.User | null) => {
      console.log("user", user)
      if(user) {        
        //que cojones es esto
        let copy = JSON.parse(JSON.stringify(user));
        
        this.store.dispatch(setUserData({ user: copy }))
        this.router.navigate([AppRoutes.Home])
      } else {
        this.store.dispatch(unsetUserData())
      }
    }) 
  }
}
