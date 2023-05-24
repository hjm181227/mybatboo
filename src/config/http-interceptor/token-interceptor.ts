import { Injectable, Injector } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { concatMap, EMPTY, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NavigateService } from "../../service/navigate.service";
import { StorageService } from "@mapiacompany/armory";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private injector: Injector,
    private storage: StorageService,
    private http: HttpClient,
    private navigate: NavigateService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      switchMap((res) => {
        if (res instanceof HttpResponse) {
          const isError = !!res.body?.error || !!res.body?.errors?.length;
          if (isError) {
            const errorTypes = [
              'EXPIRED_TOKEN'
            ];
            console.log('res', res);
            const tokenExpired = [ res.body?.error?.code, res.body?.errors[0]?.code ].some(msgOrCode => errorTypes.includes(msgOrCode));
            if (tokenExpired) {
              const refreshToken = this.storage.get('refreshToken');
              return this.http.post<{ message: string, accessToken: string, status: string}>('http://15.164.23.13:8080/member/refresh', { refreshToken }).pipe(
                map(({ accessToken }) => accessToken),
                tap(token => token && this.storage.set('token', token)),
                catchError((error) => {
                  if (error instanceof HttpErrorResponse && error.status < 500) {
                    // 토큰 생성 과정에서 생긴 문제인 경우 (500 INTERNAL ERROR는 제외)
                    this.storage.remove('token');
                    this.storage.remove('refreshToken');
                  }
                  this.navigate.openLoginModal();
                  return EMPTY;
                }),
                concatMap((token) => next.handle(this._addAuthHeader(req, token)))
              )
              // 로그인 만료
            }
          }
        }
        return of(res);
      }),
      catchError((err: HttpErrorResponse) => {
        const errorTypes = [
          'EXPIRED_TOKEN'
        ];
        const tokenExpired = [ err?.message, err?.error?.message, err?.error?.code ].some(msgOrCode => errorTypes.includes(msgOrCode));
        console.log('token-interceptor', err, tokenExpired);
        if (tokenExpired) {
          const refreshToken = this.storage.get('refreshToken');
          return this.http.post<{ accessToken: string, message: string, status: string}>('http://15.164.23.13:8080/member/refresh', { refreshToken }).pipe(
            map(({ accessToken } ) => accessToken),
            tap(token => this.storage.set('token', token)),
            catchError((error) => {
              if (error instanceof HttpErrorResponse && error.status < 500) {
                // 토큰 생성 과정에서 생긴 문제인 경우 (500 INTERNAL ERROR는 제외)
                this.storage.remove('token');
                this.storage.remove('refreshToken');
              }
              this.navigate.openLoginModal();
              return EMPTY;
            }),
            concatMap((token) => next.handle(this._addAuthHeader(req, token)))
          )
        } else {
          return throwError(() => err);
        }
      })
    );
  }

  private _addAuthHeader(req: HttpRequest<any>, token: string): HttpRequest<any> {
    let headers = req.headers.set('Authorization', `Bearer ${token}`);

    return req.clone({ headers });
  }
}

