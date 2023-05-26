import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Actions, ROOT_EFFECTS_INIT, createEffect, ofType } from '@ngrx/effects';
import {
  mergeMap,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { GlobalState } from './global';
import {
  selectNavigationId,
  selectRouteData
} from './router.selector';
import { Router } from '@angular/router';
import { ngrxRouterActions } from './router.state';
import { Location } from '@angular/common';
import { armoryActions } from '@mapiacompany/armory';
import { NavigateService } from "../service/navigate.service";


@Injectable()
export class RouterEffects {
  init$ = createEffect(() => this.actions$.pipe(
    ofType(ROOT_EFFECTS_INIT),
    mergeMap(() => this.store.select(selectRouteData))
  ), { dispatch: false });

  // ngrx/router-store가 navigationId를 주소 이동할 때마다 하나씩 높이는 특징을 이용해서 뒤로가기 로직 구현
  goBack$ = createEffect(() => this.actions$.pipe(
    ofType(ngrxRouterActions.goBack),
    withLatestFrom(this.store.select(selectNavigationId)),
    tap(([ { defaultHref }, navigationId ]) => {
      if (navigationId === 1) { // 처음 방문한 경우이므로 location.back()이 먹히지 않아서 defaultHref로 이동
        this.router.navigateByUrl(defaultHref);
      } else {
        this.location.back();
      }
    })
  ), { dispatch: false });

  goToLogin$ = createEffect(() => this.actions$.pipe(
    ofType(armoryActions.goToLogin),
    tap(() => {
      this.navigate.openLoginModal();
    }),
  ), { dispatch: false });

  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    private actions$: Actions,
    private router: Router,
    private location: Location,
    private store: Store<GlobalState>,
    private navigate: NavigateService,
  ) {
  }
}
