import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, from } from 'rxjs';
import { setUserData, unsetUserData } from '@workout-tracker/shared-store';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import firebase from 'firebase/compat/app/';

@Injectable({ providedIn: 'root'})
export class AuthService {
  private store: Store = inject(Store)
  private auth: AngularFireAuth = inject(AngularFireAuth)

  constructor() {
    this.authStateListener()
  }
  
  public logIn(userName: string, password: string): Observable<firebase.auth.UserCredential> {
    return from(this.auth.signInWithEmailAndPassword(userName, password))
  }

  public logOut() {
    return from(this.auth.signOut())
  }

  private authStateListener() {
    this.auth.authState.subscribe((user: firebase.User | null) => {
      
      if(user) {
        this.store.dispatch(setUserData({ user: user }))
      } else {
        this.store.dispatch(unsetUserData())
      }
    }) 
  }
}
