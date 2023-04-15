import { Inject, Injectable } from '@angular/core';
import { Observable, iif, of, EMPTY } from 'rxjs';
import { catchError, switchMap, take, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { StorageService } from "./storage.service";
import { ApiService } from "./api.service";
import { GlobalState } from "../ngrx";
import { selectCurrentUser } from "../ngrx/user.state";
import { ngrxUserActions } from "../ngrx/user.reducer";

// 아래 dynamic 주석 지우지 마세요. currentUser$ 때문에 넣은겁니다.
// @dynamic
@Injectable({
  providedIn: 'root'
})
export class UserActions {
  static currentUserWithApiCall$: Observable<User | undefined>;

  constructor(
    public store: Store<GlobalState>,
    public storage: StorageService,
    public api: ApiService,
    public router: Router
  ) {
    UserActions.currentUserWithApiCall$ = iif(
      () => !this.storage.get('token'),
      of(undefined),
      this.store.select(selectCurrentUser).pipe(
        take(1),
        switchMap(user => iif(() =>
            !user,
          this.api.loadCurrentUser().pipe(
            catchError(() => of(undefined)),
          ),
          of(user)
        ))
      )
    );
  }

  afterLogin(token) {
    this.storage.set('token', token); // 로그인 된 상태
    // this.storage.set('refreshToken', tokenResponse.refreshToken); // 로그인 된 상태

    this.store.dispatch(
      ngrxUserActions.loadCurrentUser.BEGIN({})
    );
  }
}
