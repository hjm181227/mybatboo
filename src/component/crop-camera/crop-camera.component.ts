import { Component, Input } from '@angular/core';
import { SyntaxSharedModule } from "../../module/shared/syntax-shared.module";
import { ApiService } from "../../service/api.service";
import { catchError, tap } from "rxjs";
import { CameraService } from "../../service/camera.service";

@Component({
  selector: 'crop-camera',
  standalone: true,
  imports: [
    SyntaxSharedModule
  ],
  templateUrl: './crop-camera.component.html',
  styleUrls: [ './crop-camera.component.scss' ]
})
export class CropCameraComponent {
  @Input() imageUrl: string;
  @Input() imageFile: File;

  constructor(
    public api: ApiService,
    public cameraService: CameraService
  ) {
  }

  requestDiagnosis(image: File) {
    console.log('file', image);
    this.api.sendImageAndLocation(image).pipe(
      tap(res => console.log(res)),
      catchError(err => {
        console.log(err);
        return err;
      })
    ).subscribe();
  }
}
