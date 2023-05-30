import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { ApiService } from "./api.service";
import { Directory, Filesystem } from "@capacitor/filesystem";

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  constructor(
    public api: ApiService,
  ) {
  }

  async takePicture(): Promise<Photo | void> {
    return await Camera.getPhoto({
      quality: 100,
      width: window.innerWidth > 640 ? 640 : window.innerWidth,
      height: window.innerWidth > 640 ? 640 : window.innerWidth,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
      promptLabelPicture: '사진 촬영',
      promptLabelPhoto: '앨범에서 선택',
      promptLabelHeader: '작물 사진',
      promptLabelCancel: '취소',
      allowEditing: false,
    });
  }

  async writeFileToDevice(dataUrl,fileName: string) {
    return await Filesystem.writeFile({
      path: fileName,
      data: dataUrl,
      directory: Directory.Data
    }).then(res => {
      return ({ ...res, fileName });
    });
  }

  async readFileFromDevice(fileName) {
    const readFile = await Filesystem.readFile({
      path: fileName,
      directory: Directory.Data
    });

    // Convert base64 string to binary data
    const binaryString = window.atob(readFile.data);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
      const ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }

    const blobData = new Blob([bytes], { type: 'image/jpg' });

    // Convert blob to File
    const file = new File([blobData], fileName, { type: 'image/jpg' });

    return file;
  }

  async deleteImageFromDevice(fileName) {
    try {
      await Filesystem.deleteFile({
        path: fileName,
        directory: Directory.Data
      });
      console.log('Image deleted successfully');
    } catch (error) {
      console.error('Error occurred while deleting image:', error);
    }
  }
}
