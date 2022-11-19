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
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      (res:LoginResponse) => {
        this.router.navigateByUrl('/');
        this.openSnackBar('Login successful!', 'Ok', 'success-snackbar');
      },
      (error:any) => {
        this.errorMsg = error.error;
        this.openSnackBar('There was an error. Please, try again.', 'Ok', 'error-snackbar');
        this.dataOk = false;
        
      }
  );
  }

  private setSession(authResult:any) {
    const expiresAt = moment().add(authResult.exp,'second');

    localStorage.setItem('id_token', authResult.sub);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }

  openSnackBar(message: string, action: string, panelClass: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: [panelClass],
    })
  }
  
  // this.authService.getUsers()
  // .subscribe( (users) => {
  //   const user = users.find( (u:any) => {
  //     if (u.email === this.loginForm.value.email) {
  //       this.emailOk = true;
  //     }else {
  //       this.emailOk = false;
  //     }

  //     if(u.password === this.loginForm.value.password) {
  //       this.passwordOk = true;
  //     }else {
  //       this.passwordOk = false;
  //     }
  //     return this.emailOk && this.passwordOk;
  //   })

  //   if(user) {
  //     console.log('LOGIN SUCCESSFULL');
  //     this.authService.logged = true;
  //     this.loginForm.reset();
  //     this.router.navigateByUrl('/');
  //   }else {
  //     this.authService.logged = false;
  //     console.log('USER NOT FOUND');
      
  //   }
  // })



}
