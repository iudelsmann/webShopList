import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  async login() {
    try {
      await this.authenticationService.login();
      this.router.navigate(['home']);
    } catch (error) {
      console.log(error);
      this.snackBar.open(error);
    }
  }
}
