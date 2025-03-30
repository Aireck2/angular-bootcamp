import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = '/api/auth';

  login(credentials: string): Observable<any> {
    return this.http
      .post<{ data: { accessToken: string } }>(
        `${this.apiUrl}/login`,
        credentials
      )
      .pipe(
        tap((response) => {
          localStorage.setItem('adminToken', response.data.accessToken);
        }),
        catchError((error) => {
          console.error('Login failed:', error);
          return throwError(() => error);
        })
      );
  }
  getMe(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`);
  }

  logout() {
    localStorage.removeItem('adminToken');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('adminToken');
  }
}
