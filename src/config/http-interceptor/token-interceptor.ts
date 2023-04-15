import { Injectable, Injector } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable, of, switchMap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StorageService } from "../../service/storage.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private injector: Injector,
    private storage: StorageService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      switchMap((res) => {
        if (res instanceof HttpResponse) {
          const isError = !!res.body?.error || !!res.body?.errors?.length;
          if (isError) {
            const errorTypes = [
              'IAM_TOKEN_EXPIRED',
              'IAM_UNAUTHORIZED',
              'UNAUTHORIZED',
              'EXPIRED_LOGIN_TOKEN',
            ];
            const tokenExpired = [ res.body?.error?.message, res.body?.errors[0]?.message ].some(msgOrCode => errorTypes.includes(msgOrCode));
            if (tokenExpired) {
              // return AccessTokenRefresher.load(this.injector).pipe(
              //   concatMap((token) => next.handle(this._addAuthHeader(req, token)))
              // );
              // 로그인 만료
            }
          }
        }
        return of(res);
      }),
      catchError((err: HttpErrorResponse) => {
        const errorTypes = [
          'IAM_TOKEN_EXPIRED',
          'IAM_UNAUTHORIZED',
          'UNAUTHORIZED',
          'EXPIRED_LOGIN_TOKEN',
        ];
        const tokenExpired = [ err?.message, err?.error?.message, err?.error?.code ].some(msgOrCode => errorTypes.includes(msgOrCode));
        if (tokenExpired) {
          // 로그인 만료
        } else {
        }
        return throwError(() => err);
      })
    );
  }

  private _addAuthHeader(req: HttpRequest<any>, token: string): HttpRequest<any> {
    let headers = req.headers.set('Authorization', `Bearer ${token}`);

    return req.clone({ headers });
  }
}

