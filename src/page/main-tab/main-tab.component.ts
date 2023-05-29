import { Component } from '@angular/core';
import { SyntaxSharedModule } from "../../module/shared/syntax-shared.module";
import { BottomTabBarComponent } from "../../component/bottom-tab-bar/bottom-tab-bar.component";
import { AnimationOptions, LottieModule } from "ngx-lottie";
import { ApiService } from "../../service/api.service";
import { FormControl } from "@angular/forms";
import { map, tap } from "rxjs";
import { Store } from "@ngrx/store";
import { GlobalState } from "../../ngrx";
import { selectCurrentUser } from "../../ngrx/user.state";
import { selectRouteData } from "../../ngrx/router.selector";
import { MpMenuCell } from "@mapiacompany/styled-components";
import { NavigateService } from "../../service/navigate.service";
import { ToastService } from "../../service/toast.service";

@Component({
  selector: 'app-main-tab',
  standalone: true,
  imports: [
    SyntaxSharedModule,
    BottomTabBarComponent,
    LottieModule,
    MpMenuCell
  ],
  templateUrl: './main-tab.component.html',
  styleUrls: [ './main-tab.component.scss' ]
})
export class MainTabComponent {
  activeTab$ = this.store$.select(selectRouteData).pipe(
    tap(console.log),
    map(({ type }) => type),
  );
  options: AnimationOptions = {
    path: '/assets/lottie/LottieMap.json',
    loop: false,
    autoplay: true,
  };
  selectedOccurenceStep = new FormControl<'warning' | 'watch' | 'forecast'>('warning');
  occurenceInfo$ = this.api.loadOccurenceInfo().pipe(
    tap(({ warningListSize, watchListSize, forecastListSize }) => {
      if (warningListSize > 0) {
        this.selectedOccurenceStep.patchValue('warning');
      } else if (watchListSize > 0) {
        this.selectedOccurenceStep.patchValue('watch');
      } else if (forecastListSize > 0) {
        this.selectedOccurenceStep.patchValue('forecast');
      } else {
        this.selectedOccurenceStep.patchValue(null);
      }
    })
  );

  currentUser$ = this.store$.select(selectCurrentUser);

  categories$ = this.api.loadUserCategories();

  constructor(
    private api: ApiService,
    private store$: Store<GlobalState>,
    private navigate: NavigateService,
    private toast: ToastService
  ) {
  }

  openDiseaseDetail(disease: { sickKey: string, sickNameKor: string, cropName: string }) {
    const { sickKey, sickNameKor, cropName } = disease;
    if (!sickKey) {
      this.toast.show('등록된 병해 상세 정보가 없습니다.');
      return;
    }
    this.navigate.openDiseaseDetailModal({ sickKey, diseaseName: sickNameKor, cropName });
  }
}
