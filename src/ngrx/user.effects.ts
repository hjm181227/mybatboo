import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType, OnInitEffects } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { mergeMap, tap } from "rxjs";
import { ngrxUserActions } from "./user.reducer";
import { StorageService } from "../service/storage.service";
import { Router } from "@angular/router";

@Injectable()
export class UserEffects implements OnInitEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(this.ngrxOnInitEffects().type),
      mergeMap(() => [
        ngrxUserActions.loadCurrentUser.BEGIN({}), // 로그인 이미 되어있는 상태에서 새로고침 할 수 있기 때문
      ])
    )
  );
  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ngrxUserActions.logout),
        tap(() => {
          this.storage.remove('token');
          this.storage.remove('refreshToken');
        }),
        tap(() => {
          this.router.navigate([ '/login' ]);
          // location.reload();
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private storage: StorageService,
    private router: Router
  ) {
  }

  ngrxOnInitEffects(): Action {
    return { type: '[UserEffects] init' };
  }
}
