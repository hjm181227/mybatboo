import { Component } from '@angular/core';
import { SyntaxSharedModule } from "../../module/shared/syntax-shared.module";

@Component({
  selector: 'app-crop-image-ready',
  standalone: true,
  imports: [
    SyntaxSharedModule
  ],
  templateUrl: './crop-image-ready.component.html',
  styleUrls: ['./crop-image-ready.component.scss']
})
export class CropImageReadyComponent {
}
