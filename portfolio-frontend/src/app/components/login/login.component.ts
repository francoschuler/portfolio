import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ViewEncapsulation } from '@angular/core';

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

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  ngOnInit(): void {
  }

  login() {
    this.authService.getUsers()
      .subscribe( (users) => {
        const user = users.find( (u:any) => {
          return u.email === this.loginForm.value.email && u.password === this.loginForm.value.password;
        })

        if(user) {
          console.log('LOGIN SUCCESSFULL');
          this.authService.logged = true;
          this.loginForm.reset();
          this.router.navigateByUrl('/');
        }else {
          this.authService.logged = false;
          console.log('USER NOT FOUND');
          
        }
      })
  }



}
