import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthenticationService {

  private user: Observable<firebase.User>;


  constructor(public afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
  }

  login() {
    const provider = new firebase.auth.GoogleAuthProvider();

    return this.afAuth.auth.signInWithPopup(provider)
      .catch(error => console.log(error));
  }

  logout() {
    return this.afAuth.auth.signOut();
  }
}
