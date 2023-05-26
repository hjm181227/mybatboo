import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '@mapiacompany/armory';
import { UserActions } from "../../service/user.action";

// 로그인 처리 관련 핸들러 (모바일 / PC에서 서버로부터 받은 로그인 주소를 동작시키기 위해)
@Injectable()
export class AuthHandleMiddleware  {
  constructor(
    private router: Router,
    private storage: StorageService,
    private userActions: UserActions,
  ) {
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const { accessToken, refreshToken } = childRoute.queryParams;
    if (accessToken && refreshToken) {
      this.userActions.afterLogin({ accessToken, refreshToken });
    }

    return true;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivateChild(route, state);
  }
}
