import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/do';

function isLoggedIn(authState: Observable<any>): Observable<boolean> {
  return authState
    .first()
    .map(logged => !!logged);
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
  ) { }

  canActivate(): Observable<boolean> {
    return isLoggedIn(this.afAuth.authState)
      .do(logged => !logged ? this.router.navigate(['/login']) : true);
  }
}

@Injectable()
export class AlreadySignedInGuard implements CanActivate {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
  ) { }

  canActivate(): Observable<boolean> {
    return isLoggedIn(this.afAuth.authState)
      .map(logged => !logged)
      .do(notLogged => !notLogged ? this.router.navigate(['/home']) : true);
  }
}

