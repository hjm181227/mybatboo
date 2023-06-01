import { Component, HostBinding, Input } from '@angular/core';
import { SyntaxSharedModule } from "../../module/shared/syntax-shared.module";
import { GlobalState } from "../../ngrx";
import { Store } from "@ngrx/store";
import { selectCurrentUser } from "../../ngrx/user.state";
import { NavigateService } from "../../service/navigate.service";
import { map, tap } from "rxjs";
import { StorageService } from "@mapiacompany/armory";
import { ngrxUserActions } from "../../ngrx/user.reducer";
import { matchMedia$ } from "../../util/util";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    SyntaxSharedModule
  ],
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent {
  @Input() mode: 'user' | 'expert' | 'admin' = 'user';
  currentUser$ = this.store.select(selectCurrentUser).pipe();
  screenSize$ = matchMedia$<string>({ xs: 'xs' }, 'default').pipe(
    tap(console.log)
  );

  constructor(
    private store: Store<GlobalState>,
    private navigate: NavigateService,
    private storage: StorageService
  ) {
  }

  goToLogin() {
    this.navigate.openLoginModal();
  }

  logout() {
    this.store.dispatch(ngrxUserActions.logout());
  }
}
