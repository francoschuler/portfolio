import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private TOKEN_KEY: string = 'token';

  private logged: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

  // private loginUser (email: string, password: string) : Observable<string> {
  //   const user: User = {email, password};
  //   return this.http.post(`${environment.url}/users_auth`, user, { responseType: 'text' });
  // }

  login(email: string, password: string) {
    // this.loginUser(email, password).subscribe( (token) => {
    //   localStorage.setItem(this.TOKEN_KEY, token);
    //   this.router.navigateByUrl('/');
    // })

    if (email === environment.email && password === environment.password) {
      console.log('SII');
      
      this.logged = true;
      this.router.navigateByUrl('/');
    }

    console.log('NO');

  }

  logout() {
    // localStorage.removeItem(this.TOKEN_KEY);
    // this.router.navigateByUrl('/login');
    this.logged = false;
    this.router.navigateByUrl('/')
  }

  isLogged(): boolean {
    return this.logged;
    // let token = localStorage.getItem(this.TOKEN_KEY);
    // return token != null && token.length > 0;
  }

  // public getToken(): string | null {
  //   return this.isLogged() ? localStorage.getItem(this.TOKEN_KEY) : null;
  // }
}
