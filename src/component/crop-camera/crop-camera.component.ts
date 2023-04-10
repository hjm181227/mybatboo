import { Component, HostListener } from '@angular/core';
import { Camera, CameraResultType, Photo } from "@capacitor/camera";
import { SharedModule } from "../../module/shared/shared.module";
import { ApiService } from "../../service/api.service";
import { catchError, tap } from "rxjs";
import { ToastService } from "../../service/toast.service";
import { Capacitor } from "@capacitor/core";

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
      this.convertPhotoToFile(image).then(img => this.requestDiagnosis(img));
    });
    image.catch(err => console.log(err));

    // Can be set to the src of an image now
  }

  async convertPhotoToFile(photo: Photo): Promise<File> {
    const base64Data = await this.getBase64Data(photo);

    const fileName = `image_${new Date().getTime()}.jpg`;
    const contentType = this.getContentType(base64Data);

    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const file = new File(byteArrays, fileName, { type: contentType });
    return file;
  }

  getBase64Data(photo: Photo): Promise<string> {
    const isWebPlatform = Capacitor.getPlatform() === 'web';

    if (isWebPlatform) {
      return fetch(photo.webPath).then(res => res.blob()).then(blob => this.readFileAsBase64(blob));
    } else {
      return this.readFileAsBase64(photo);
    }
  }

  readFileAsBase64(file: any): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.toString().split(',')[1]);
      reader.onerror = error => reject(error);
    });
  }

  getContentType(base64Data: string): string {
    const block = base64Data.split(';')[0];
    const contentType = block.split(':')[1];
    return contentType;
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
