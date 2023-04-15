import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { tap } from 'rxjs/operators';
import { isPlatformServer } from '@angular/common';
import { StorageService } from "../../service/storage.service";

@Injectable()
export class JWTInterceptor implements HttpInterceptor {

  constructor(
    private storage: StorageService,
    @Inject(PLATFORM_ID) public platformId: string,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isApi = req.url.includes('15.164.23.13')
      || req.url.includes('172.');

    const headers = {};
    const startDate = new Date();

    if (isApi) {
      if (!req.params.get('skipHeaders')) {
        const token = this.storage.get('token');
        if (token) {
          Object.assign(headers, {
            Authorization: `Bearer ${token}`
          });
        } else {
          delete headers['Authorization'];
        }
      }
    }

    if (Object.keys(headers).length > 0) {
      req = req.clone({
        setHeaders: headers
      });
    }

    if (isPlatformServer(this.platformId)) {
      return next.handle(req).pipe(
        tap((): void => {
          const duration = (new Date().valueOf() - startDate.valueOf()) / 1000;
          if (isApi && duration > 0.1) {
            console.warn(`${duration}s 걸려서 ${req.url} 실행됨`);
          }
        }),
      );
    } else {
      return next.handle(req);
    }
  }
}
