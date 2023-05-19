import { Component } from '@angular/core';
import { SyntaxSharedModule } from "../../module/shared/syntax-shared.module";
import { BottomFixedBar } from "../../component/bottom-fixed-bar/bottom-fixed-bar";
import { NavigateService } from "../../service/navigate.service";
import { GlobalState } from "../../ngrx";
import { Store } from "@ngrx/store";
import { selectCurrentUser } from "../../ngrx/user.state";
import { AbstractBaseComponent, AsyncStatus, bindStatus, prepare } from "@mapiacompany/armory";
import { BehaviorSubject, tap } from "rxjs";
import { Router } from "@angular/router";
import { ToastService } from "../../service/toast.service";

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [ SyntaxSharedModule, BottomFixedBar ],
  templateUrl: './onboarding.component.html',
  styleUrls: [ './onboarding.component.scss' ]
})
export class OnboardingComponent extends AbstractBaseComponent {
  currentUser$ = this.store$.select(selectCurrentUser);
  status$ = new BehaviorSubject(AsyncStatus.INITIAL);
  functions = [
    '작물 이미지를 촬영하여 병해 진단하기',
    '내 주변 병해 발생 지도 보기',
    '작물 진단 기록 관리',
    '진단 결과에 대해 궁금한 점을 전문가에게 질문하기',
  ];

  constructor(
    private navigate: NavigateService,
    private store$: Store<GlobalState>,
    private router: Router,
    private toast: ToastService
  ) {
    super();
  }

  ngOnInit() {
    this.subscribeOn(
      this.currentUser$.pipe(
        bindStatus(this.status$),
        tap(user => user && this.router.navigate([ '/main' ]))
      )
    )
  }

  goToLogin() {
    this.navigate.openLoginModal();
  }
}
