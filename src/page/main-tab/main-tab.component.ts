import { Component } from '@angular/core';
import { SharedModule } from "../../module/shared/shared.module";
import { BottomTabBarComponent } from "../../component/bottom-tab-bar/bottom-tab-bar.component";

@Component({
  selector: 'app-main-tab',
  standalone: true,
  imports: [
    SharedModule,
    BottomTabBarComponent
  ],
  templateUrl: './main-tab.component.html',
  styleUrls: ['./main-tab.component.scss']
})
export class MainTabComponent {

}
