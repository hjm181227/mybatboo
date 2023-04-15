import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType, OnInitEffects } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { EMPTY, of} from "rxjs";
import { catchError, filter, mergeMap, tap, withLatestFrom } from "rxjs/operators";
import { ngrxUserActions } from "./user.reducer";
import { StorageService } from "../service/storage.service";
import { Router } from "@angular/router";
import { selectCurrentUser } from "./user.state";
import { ApiService } from "../service/api.service";
import { GlobalState } from "./global";

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

  loadCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ngrxUserActions.loadCurrentUser.BEGIN),
      filter(() => !!this.storage.get('token')),
      mergeMap(({ context }) =>
        this.api.loadCurrentUser().pipe(
          withLatestFrom(this.store.select(selectCurrentUser)), // 로그인 시도하기 전 유저 정보
          mergeMap(([ currentUser, prevUser ]) => {

            const sideEffects: any[] = [
              ngrxUserActions.loadCurrentUser.SUCCESS({ currentUser, context })
            ];
            if (!prevUser || prevUser.userId !== currentUser.userId) {
              sideEffects.push(

              );
            }

            return sideEffects;
          }),
          catchError((err) => {
            if (err.error instanceof Error) {
              // client-side error
            } else if (err.status < 500) {
              switch (err.error.state) {
                case 'INVALID_LOGIN_HASH': // 계정 정보가 바껴서 새로 로그인해야하는 경우
                case 'EXPIRED_LOGIN_TOKEN': // 마지막 로그인 이후 30일이 지난 경우
                  // this.alert.error(err);
                  return of(ngrxUserActions.logout());
              }
            }

            return EMPTY;
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private storage: StorageService,
    private router: Router,
    private api: ApiService,
    private store: Store<GlobalState>
  ) {
  }

  ngrxOnInitEffects(): Action {
    return { type: '[UserEffects] init' };
  }
}
