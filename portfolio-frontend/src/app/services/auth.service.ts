import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../models/User';

import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { signOut } from '@firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) {}

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
      return signOut(this.auth);
  }

  isLoggedIn() {
      // return localStorage.getItem('user') != null;
      return this.auth.currentUser !== null;
  }  
}
