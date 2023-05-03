import { Component } from '@angular/core';
import { SharedModule } from "../../module/shared/shared.module";
import { BottomTabBarComponent } from "../../component/bottom-tab-bar/bottom-tab-bar.component";
import { AnimationOptions, LottieModule } from "ngx-lottie";
import { CardModule } from "ng-zorro-antd-mobile";

@Component({
  selector: 'app-main-tab',
  standalone: true,
  imports: [
    SharedModule,
    BottomTabBarComponent,
    LottieModule,
    CardModule
  ],
  templateUrl: './main-tab.component.html',
  styleUrls: ['./main-tab.component.scss']
})
export class MainTabComponent {
  options: AnimationOptions = {
    path: '/assets/lottie/LottieMap.json',
    loop: false,
    autoplay: true,
  };
}
