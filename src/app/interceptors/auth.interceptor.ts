import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('adminToken');
    const authReq = token
      ? req.clone({
          setHeaders: { Authorization: `Bearer ${token}` },
        })
      : req;

    return next.handle(authReq);
  }
}
