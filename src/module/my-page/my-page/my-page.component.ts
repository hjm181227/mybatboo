import { Component } from '@angular/core';
import { SyntaxSharedModule } from "../../shared/syntax-shared.module";
import { BottomTabBarComponent } from "../../../component/bottom-tab-bar/bottom-tab-bar.component";
import { Store } from "@ngrx/store";
import { GlobalState } from "../../../ngrx";
import { selectCurrentUser } from "../../../ngrx/user.state";
import { tap } from "rxjs";
import { AlertService, MpLabel, MpMenuCell } from "@mapiacompany/styled-components";
import { ngrxUserActions } from "../../../ngrx/user.reducer";
import { filter } from "rxjs/operators";

@Component({
  selector: 'app-my-page',
  standalone: true,
  imports: [
    SyntaxSharedModule,
    BottomTabBarComponent,
    MpLabel,
    MpMenuCell
  ],
  templateUrl: './my-page.component.html',
  styleUrls: [ './my-page.component.scss' ]
})
export class MyPageComponent {
  currentUser$ = this.store.select(selectCurrentUser);

  pageMenus = [
    { name: '작물 관리', routerLink: [ 'category' ], icon: 'topic' },
    { name: '전문가 문의', routerLink: [ 'inquiry' ], icon: 'contact_support' }
  ];

  accountMenus = [
    { name: '로그아웃', action: 'logout', icon: 'logout', color: 'grayDark' },
    { name: '회원 탈퇴', action: 'withdraw', icon: 'person_remove', color: 'redLight' }
  ]

  constructor(
    private store: Store<GlobalState>,
    private alert: AlertService
  ) {
  }

  accountAction(type: string) {
    switch (type) {
      case 'logout':
        this.logout();
        break;
      case "withdraw":
        this.deleteAccount();
        break;
    }
  }

  logout() {
    this.alert.confirm({
      title: '로그아웃',
      content: '로그아웃 하시겠습니까?',
      confirmMessage: '로그아웃',
      cancelMessage: '취소',
      confirmButtonColor: 'red',
    }).pipe(
      filter(confirm => !!confirm),
      tap(() => this.store.dispatch(ngrxUserActions.logout()))
    ).subscribe()
  }

  deleteAccount() {
    this.alert.confirm({
      title: '회원 탈퇴',
      content: '계정을 탈퇴하시겠습니까?',
      confirmMessage: '탈퇴',
      cancelMessage: '취소',
      confirmButtonColor: 'red',
    }).pipe(
      filter(confirm => !!confirm),
      tap(() => this.store.dispatch(ngrxUserActions.deleteAccount()))
    ).subscribe()
  }
}
