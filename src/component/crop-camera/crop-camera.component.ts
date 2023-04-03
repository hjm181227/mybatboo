import { Component, HostListener } from '@angular/core';
import { Camera, CameraResultType, Photo } from "@capacitor/camera";
import { SharedModule } from "../../module/shared/shared.module";
import { ApiService } from "../../service/api.service";
import { catchError, tap } from "rxjs";
import { ToastService } from "../../service/toast.service";

@Component({
  selector: 'crop-camera',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './crop-camera.component.html',
  styleUrls: [ './crop-camera.component.scss' ]
})
export class CropCameraComponent {
  imageUrl: string = '';
  exif: any;
  imageUri: Photo;

  constructor(
    public api: ApiService,
    public toast: ToastService
  ) {
  }

  @HostListener('click')
  takePicture() {
    const image = Camera.getPhoto({
      quality: 90,
      width: 614,
      height: 614,
      resultType: CameraResultType.Uri,
      saveToGallery: true
    });

    image.then(image => {
      this.imageUri = image;
      this.imageUrl = image.webPath || '';
      this.exif = image.exif;
      this.requestDiagnosis(image);
    });
    image.catch(err => console.log(err));

    // Can be set to the src of an image now
  }

  requestDiagnosis(image: Photo) {
    this.api.sendImageAndLocation(this.imageUri).pipe(
      tap(res => console.log(res)),
      tap((res: string) => this.toast.showToast(res)),
      catchError(err => {
        console.log(err);
        return err;
      })
    ).subscribe();
  }
}
