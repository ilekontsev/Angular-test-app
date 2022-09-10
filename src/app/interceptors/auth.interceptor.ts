import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, throwError } from 'rxjs';
import { ApiService } from '../services/api.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _apiService: ApiService, private _router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.includes('auth')) {
      return next.handle(req);
    }
    const authReq = req.clone({
      headers: req.headers.set(
        'Authorize',
        localStorage.getItem('accessToken')
      ),
    });

    return next.handle(authReq).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          this._router.navigateByUrl('login');
          return next.handle(req);
        } else {
          return of(err);
        }
      })
    );
  }
}
