import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  login(adminToken: string) {
    localStorage.setItem('adminToken', adminToken);
  }

  logout() {
    localStorage.removeItem('adminToken');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('adminToken');
  }
}
