import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';




function isLoggedIn(authState: Observable<any>): Observable<boolean> {
  return authState
    .pipe(first(), map(logged => !!logged));
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
  ) { }

  canActivate(): Observable<boolean> {
    return isLoggedIn(this.afAuth.authState)
      .pipe(tap(logged => !logged ? this.router.navigate(['/login']) : true));
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
      .pipe(map(logged => !logged), tap(notLogged => !notLogged ? this.router.navigate(['/home']) : true));
  }
}

