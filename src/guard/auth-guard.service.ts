import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { UserActions } from "../service/user.action";

@Injectable({ providedIn: 'root' })
export class AuthGuard  {

  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    private router: Router,
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return UserActions.currentUserWithApiCall$.pipe(
      map(user => !!user),
      tap(isLoggedIn => !isLoggedIn && this.router.navigate([ '/onboarding' ]))
    );
  }
}
