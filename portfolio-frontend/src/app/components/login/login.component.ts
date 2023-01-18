import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ViewEncapsulation } from '@angular/core';

import * as moment from "moment";
import jwt_decode from 'jwt-decode';
import { LoginResponse } from 'src/app/models/User';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  isLogin: boolean = false;
  hidePassword: boolean = true;
  dataOk: boolean = true;
  errorMsg: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.required]],
    })
  }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.loginForm.value)
    .then(
      () => {
        this.router.navigateByUrl('/');
        this.openSnackBar('Login successful!', 'Ok', 'success-snackbar');
    })
    .catch( (error) => {
      switch(error.code){
        case 'auth/wrong-password':
            this.errorMsg = 'Password was incorrect.'
            break;

        case 'auth/user-not-found':
            this.errorMsg = 'Email was incorrect.'
            break;

        default:
            this.errorMsg = 'There was an error trying to log in.'
            break;
      }
      this.dataOk = false;
      
      }
    );
  }

  openSnackBar(message: string, action: string, panelClass: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: [panelClass],
    })
  }

}
