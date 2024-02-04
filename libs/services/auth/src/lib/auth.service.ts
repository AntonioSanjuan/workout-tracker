import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, from } from 'rxjs';
import { AppInit, loadedApp, logOutRequest, setUser, unloadedApp } from '@workout-tracker/shared-store';
import { Auth, signInWithEmailAndPassword, User, onAuthStateChanged, signOut } from '@angular/fire/auth';

@Injectable({ providedIn: 'root'})
export class AuthService {
  private store: Store = inject(Store)
  private auth: Auth = inject(Auth)

  constructor() {
    this.authStateListener()
  }
  
  public logIn(userName: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, userName, password))
  }

  public logOut() {
    return from(signOut(this.auth))
  }

  private authStateListener() {
    onAuthStateChanged(this.auth, 
      (user: User | null) => {
        if(user) {
          this.setUser(user)
        } else {
          this.store.dispatch(logOutRequest())
        }
      }
    )  
  }

  private setUser(user: User): void {
    this.store.dispatch(setUser({ user: user }))
    this.store.dispatch(loadedApp({initialized: AppInit.ACCOUNT}))
  }
}
