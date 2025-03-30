import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  if (req.headers.has('Skip-Auth')) {
    const newReq = req.clone({ headers: req.headers.delete('Skip-Auth') });
    return next(newReq);
  }

  const token = localStorage.getItem('adminToken');
  const clonedRequest = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(clonedRequest);
};
