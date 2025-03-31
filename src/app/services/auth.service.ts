import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {
  LoginCredentials,
  LoginResponse,
  SignupCredentials,
} from '../types/auth.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = `${import.meta.env.NG_APP_API_URL}/api/v1/auth`;
  adminToken = signal(localStorage.getItem('adminToken') ?? '');
  userToken = signal(localStorage.getItem('userToken') ?? '');
  userData = signal(JSON.parse(localStorage.getItem('userData') ?? '{}'));

  setValue(key: string, value: string) {
    localStorage.setItem(key, value);
    if (key === 'adminToken') {
      this.adminToken.set(value);
    }
    if (key === 'userToken') {
      this.userToken.set(value);
    }
    if (key === 'userData') {
      this.userData.set(JSON.parse(value));
    }
  }

  clearValue(key: string) {
    localStorage.removeItem(key);
    if (key === 'adminToken') {
      this.adminToken.set('');
    }
    if (key === 'userToken') {
      this.userToken.set('');
    }
    if (key === 'userData') {
      this.userData.set('');
    }
  }

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http
      .post<{ data: { accessToken: string } }>(
        `${this.apiUrl}/login`,
        credentials
      )
      .pipe(
        catchError((error) => {
          console.error('Login failed:', error);
          return throwError(() => error);
        })
      );
  }
  getMe(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`);
  }
  getMeUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`, {
      headers: {
        Authorization: `Bearer ${this.userToken()}`,
      },
    });
  }

  signup(credentials: SignupCredentials): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, credentials);
  }

  logoutAdmin() {
    this.clearValue('adminToken');
  }
  logoutUser() {
    this.clearValue('userToken');
    this.clearValue('userData');
  }
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  isActive: true;
  createdAt: string;
  updatedAt: string;
}
