import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ViewEncapsulation } from '@angular/core';

import * as moment from "moment";
import jwt_decode from 'jwt-decode';
import { LoginResponse } from 'src/app/models/User';

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
  emailOk: boolean = true;
  passwordOk: boolean = true;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      (res:LoginResponse) => {
        console.log(jwt_decode(res.accessToken))
        this.setSession(jwt_decode(res.accessToken));
        this.router.navigateByUrl('/')
      },
      (error:any) => {
        console.log("USER NOT FOUND");
        
      }
  );
  }

  private setSession(authResult:any) {
    const expiresAt = moment().add(authResult.exp,'second');

    localStorage.setItem('id_token', authResult.sub);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
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
