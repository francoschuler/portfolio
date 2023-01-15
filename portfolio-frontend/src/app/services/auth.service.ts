import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, first, map, Observable, shareReplay, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResponse, User } from '../models/User';

import * as moment from "moment";
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

//   {
//     "email": "franschuler20@hotmail.com",
//     "iat": 1667750200,
//     "exp": 1667753800,
//     "sub": "1"
// }

  login(email: string, password: string) {
    return this.http.post<LoginResponse>(`${environment.url}/login`, {email, password})
    .pipe(map((res => {
      if (res && res.accessToken) {
        localStorage.setItem('user', JSON.stringify(res));
      }
      return res;
    })));
  }

  logout() {
      localStorage.removeItem('user');
  }

  public isLoggedIn() {
      // return localStorage.getItem('user') != null;
      return true;
  }  
}
