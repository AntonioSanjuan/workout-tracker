import { Injectable, inject } from '@angular/core';
import { Observable, from } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable()
export class AuthService {
  private auth: AngularFireAuth = inject(AngularFireAuth)
  
  public logIn(userName: string, password: string): Observable<firebase.auth.UserCredential> {
    return from(this.auth.signInWithEmailAndPassword(userName, password))
  }

  public logOut() {
    return from(this.auth.signOut())
  }

  public signUp(userName: string, password: string): Observable<firebase.auth.UserCredential> {
    return from(this.auth.createUserWithEmailAndPassword(userName, password))
  }

  public googleSignIn(): Observable<firebase.auth.UserCredential> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return from(this.auth.signInWithPopup(provider))
  }

  public isNewUser(userCredential: firebase.auth.UserCredential|null):boolean {
    return !!userCredential?.additionalUserInfo?.isNewUser
  }
}
