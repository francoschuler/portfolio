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
    return this.http.post<LoginResponse>(`${environment.url}/login`, {email, password}).pipe(tap((res => jwt_decode(res.accessToken))));
  }

  logout() {
      localStorage.removeItem("id_token");
      localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
      return moment().isBefore(this.getExpiration());
  }

  getExpiration() {
      const expiration = localStorage.getItem("expires_at");
      const expiresAt = JSON.parse(expiration || '{}');
      return moment(expiresAt);
  }    
}
