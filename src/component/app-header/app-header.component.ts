import { Component } from '@angular/core';
import { SyntaxSharedModule } from "../../module/shared/syntax-shared.module";
import { GlobalState } from "../../ngrx";
import { Store } from "@ngrx/store";
import { selectCurrentUser } from "../../ngrx/user.state";
import { NavigateService } from "../../service/navigate.service";
import { map } from "rxjs";
import { StorageService } from "@mapiacompany/armory";

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
  currentUser$ = this.store.select(selectCurrentUser).pipe(
    map(() => this.storage.get('token'))
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
}
