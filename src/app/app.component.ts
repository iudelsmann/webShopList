import { Component } from '@angular/core';
import { routerTransition } from './animations/routerAnimations';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  animations: [routerTransition],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry
      .addSvgIcon('google',
        sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/google-logo.svg'));
  }

  getState(outlet) {
    return outlet.activatedRouteData.page;
  }
}
