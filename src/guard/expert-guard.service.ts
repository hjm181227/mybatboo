import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { map, take, tap } from 'rxjs/operators';
import { UserActions } from "../service/user.action";
import { NavigateService } from "../service/navigate.service";
import { Actions, ofType } from "@ngrx/effects";
import { ngrxUserActions } from "../ngrx/user.reducer";

@Injectable({ providedIn: 'root' })
export class ExpertGuard  {

  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    private router: Router,
    private navigate: NavigateService,
    private actions$: Actions
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return UserActions.currentUserWithApiCall$.pipe(
      map(user => {
        if (user && user.authLevel === 2) {
          return true;
        } else if (user) {
          this.router.navigate([ '/main' ]);
          return false;
        } else {
          this.navigate.openLoginModal(() => {
            this.actions$.pipe(
              ofType(ngrxUserActions.loadCurrentUser.SUCCESS),
              tap(({ currentUser }) => {
                this.router.navigate(currentUser.authLevel === 2 ? [ state.url ] : [ '/main' ])
              }),
              take(1)
            ).subscribe();
          })
        }

        return false;
      }),
      // map(user => !!user),
      // tap(isLoggedIn => !isLoggedIn && this.router.navigate([ '/onboarding' ]))
    );
  }
}
