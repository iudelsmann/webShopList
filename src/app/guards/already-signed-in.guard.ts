import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/do';

@Injectable()
export class AlreadySignedInGuard implements CanActivate {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
  ) { }

  canActivate(): Observable<boolean> {
    return this.afAuth.authState
      .first()
      .map(authState => !!authState)
      .do(auth => auth ? this.router.navigate(['/home']) : false);
  }
}
