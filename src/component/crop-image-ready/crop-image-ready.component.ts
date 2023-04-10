import { Component } from '@angular/core';
import { SharedModule } from "../../module/shared/shared.module";

@Component({
  selector: 'app-crop-image-ready',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './crop-image-ready.component.html',
  styleUrls: ['./crop-image-ready.component.scss']
})
export class CropImageReadyComponent {
}
