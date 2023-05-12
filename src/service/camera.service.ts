import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Capacitor } from "@capacitor/core";
import { catchError, Observable, tap } from "rxjs";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  imageUrl: string = '';
  exif: any;
  imageUri: Photo;

  constructor(
    public api: ApiService,
  ) {}

  takePicture(): Promise<Photo | void> {
    const image = Camera.getPhoto({
      quality: 90,
      width: window.innerWidth,
      height: window.innerWidth,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      allowEditing: false
    });

    return image;

    let imgFile: Promise<File>



    return image.then(image => {
      this.imageUri = image;
      this.imageUrl = image.webPath || '';
      this.exif = image.exif;
      return image;
      this.convertPhotoToFile(image).then(img => {
        console.log('before: ', image, '\nafter: ', img);
        // this.requestDiagnosis(img)
      });
    });

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

  //

  // async convertPhotoToFile(photo: Photo): Promise<File> {
  //   const base64Data = photo.base64String;
  //
  //   const fileName = `image_${new Date().getTime()}.jpg`;
  //   const contentType = this.getContentType(base64Data);
  //
  //   const byteCharacters = atob(base64Data);
  //   const byteArrays = [];
  //
  //   for (let offset = 0; offset < byteCharacters.length; offset += 512) {
  //     const slice = byteCharacters.slice(offset, offset + 512);
  //     const byteNumbers = new Array(slice.length);
  //
  //     for (let i = 0; i < slice.length; i++) {
  //       byteNumbers[i] = slice.charCodeAt(i);
  //     }
  //
  //     const byteArray = new Uint8Array(byteNumbers);
  //     byteArrays.push(byteArray);
  //   }
  //
  //   const file = new File(byteArrays, fileName, { type: contentType });
  //   return file;
  // }
  //
  // getContentType(base64Data: string): string {
  //   const block = base64Data.split(';')[0];
  //   const contentType = block.split(':')[1];
  //   return contentType;
  // }
}
