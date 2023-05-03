import { Component } from '@angular/core';
import { SharedModule } from "../../../shared/shared.module";
import { BottomTabBarComponent } from "../../../../component/bottom-tab-bar/bottom-tab-bar.component";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    SharedModule,
    BottomTabBarComponent
  ],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {

}
