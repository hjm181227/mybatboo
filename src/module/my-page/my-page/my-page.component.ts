import { Component } from '@angular/core';
import { SyntaxSharedModule } from "../../shared/syntax-shared.module";
import { BottomTabBarComponent } from "../../../component/bottom-tab-bar/bottom-tab-bar.component";
import { Store } from "@ngrx/store";
import { GlobalState } from "../../../ngrx";
import { selectCurrentUser } from "../../../ngrx/user.state";
import { tap } from "rxjs";
import { MpLabel, MpMenuCell } from "@mapiacompany/styled-components";

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
  styleUrls: ['./my-page.component.scss']
})
export class MyPageComponent {
  currentUser$ = this.store.select(selectCurrentUser).pipe(
    tap(console.log)
  )

  menus = [
    { label: '작물 관리', routerLink: [ '/categories' ], icon: 'topic' },
    { label: '전문가 문의', routerLink: [ '/inquiry' ], icon: 'contact' }
  ];

  constructor(
    private store: Store<GlobalState>
  ) {
  }
}
