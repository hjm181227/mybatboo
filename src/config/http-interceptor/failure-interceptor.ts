import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { catchError, mergeMap, retryWhen } from 'rxjs/operators';
import { isPlatformServer } from '@angular/common';

@Injectable()
export class FailureInterceptor implements HttpInterceptor {
  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let count = 0;
    const retryCount = (req.method.toUpperCase() === 'GET' || req.url.includes('graphql') || req.url.includes('gql')) ? 5 : 0;
    return next.handle(req).pipe(
      retryWhen(errors =>
        errors.pipe(
          mergeMap(error => {
            if ((error.status === 0 || error.status === 502) && ++count < retryCount) {
              return isPlatformServer(this.platformId) ? timer(0) : timer(500);
            }
            return throwError(error);
          }),
          catchError((error: HttpErrorResponse) => throwError(() => error))
        )
      )
    );
  }
}
