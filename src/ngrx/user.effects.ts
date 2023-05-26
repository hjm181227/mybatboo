import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType, OnInitEffects } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { EMPTY, of} from "rxjs";
import { catchError, filter, mergeMap, tap, withLatestFrom } from "rxjs/operators";
import { ngrxUserActions } from "./user.reducer";
import { Router } from "@angular/router";
import { selectCurrentUser } from "./user.state";
import { ApiService } from "../service/api.service";
import { GlobalState } from "./global";
import { StorageService } from "@mapiacompany/armory";
import { ToastService } from "../service/toast.service";
import { UserActions } from "../service/user.action";

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
          this.router.navigate([ '/onboarding' ]);
          // location.reload();
        })
      ),
    { dispatch: false }
  );

  loadCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ngrxUserActions.loadCurrentUser.BEGIN),
      filter(() => {
        const token = this.storage.get('token');
        return !!token && token !== 'undefined';
      }),
      mergeMap(({ context }) =>
        this.api.loadCurrentUser().pipe(
          withLatestFrom(this.store.select(selectCurrentUser)), // 로그인 시도하기 전 유저 정보
          mergeMap(([ currentUser, prevUser ]) => {

            const sideEffects: any[] = [
              ngrxUserActions.loadCurrentUser.SUCCESS({ currentUser, context })
            ];
            if (!prevUser || prevUser.userId !== currentUser.userId) {
              sideEffects.push(
                //
                // 진단 기록 목록 가져오기
              );
            }

            return sideEffects;
          }),
          catchError((err) => {
            if (err.error instanceof Error) {
              console.log('client-side error', err.error.message);
              // client-side error
            } else if (err.status < 500) {
              console.log('user.effect.ts - loadCurrentUser$', err);
              switch (err.error.code) {
                case 'INVALID_TOKEN': // 토큰 만료
                  this.toast.show(err.error.message);
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
    private store: Store<GlobalState>,
    private toast: ToastService,
    private userActions: UserActions
  ) {
  }

  ngrxOnInitEffects(): Action {
    return { type: '[UserEffects] init' };
  }
}
