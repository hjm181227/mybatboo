import { Component } from '@angular/core';
import { SyntaxSharedModule } from "../../module/shared/syntax-shared.module";
import { BottomTabBarComponent } from "../../component/bottom-tab-bar/bottom-tab-bar.component";
import { AnimationOptions, LottieModule } from "ngx-lottie";

@Component({
  selector: 'app-main-tab',
  standalone: true,
  imports: [
    SyntaxSharedModule,
    BottomTabBarComponent,
    LottieModule
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
