import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, switchMap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(private auth: AuthService, private api: ApiService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.getToken();
    let authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

    return next.handle(authReq).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401 && !this.isRefreshing) {
          return this.handle401Error(authReq, next);
        }
        return throwError(() => err);
      })
    );
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.isRefreshing = true;
    const refreshToken = this.auth.getRefreshToken();
    if (!refreshToken) {
      this.auth.logout();
      this.router.navigateByUrl('/login');
      return throwError(() => new Error('No refresh token'));
    }

    return this.api.refreshToken(refreshToken).pipe(
      switchMap(res => {
        this.isRefreshing = false;
        this.auth.saveToken(res.accessToken);
        const clonedReq = req.clone({ setHeaders: { Authorization: `Bearer ${res.accessToken}` } });
        return next.handle(clonedReq);
      }),
      catchError(err => {
        this.isRefreshing = false;
        this.auth.logout();
        this.router.navigateByUrl('/login');
        return throwError(() => err);
      })
    );
  }
}
