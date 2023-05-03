import { Component } from '@angular/core';
import { CropCameraComponent } from "../crop-camera/crop-camera.component";
import { SharedModule } from "../../module/shared/shared.module";
import { TabBarModule } from "ng-zorro-antd-mobile";
import { FormControl } from "@angular/forms";

@Component({
  selector: 'bottom-tab-bar',
  standalone: true,
  imports: [
    SharedModule,
    CropCameraComponent,
    TabBarModule
  ],
  templateUrl: './bottom-tab-bar.component.html',
  styleUrls: [ './bottom-tab-bar.component.scss' ]
})
export class BottomTabBarComponent {
  activeTab: FormControl<'home' | 'camera' | 'user'> = new FormControl('home');

  changeTab(tab) {
    if (this.activeTab.value === tab) return;
    this.activeTab.patchValue(tab);
  }
}
