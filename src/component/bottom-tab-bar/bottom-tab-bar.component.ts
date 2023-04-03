import { Component } from '@angular/core';
import { CropCameraComponent } from "../crop-camera/crop-camera.component";
import { SharedModule } from "../../module/shared/shared.module";

@Component({
  selector: 'bottom-tab-bar',
  standalone: true,
  imports: [
    SharedModule,
    CropCameraComponent
  ],
  templateUrl: './bottom-tab-bar.component.html',
  styleUrls: ['./bottom-tab-bar.component.scss']
})
export class BottomTabBarComponent {

}
