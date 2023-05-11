import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { CameraService } from "./camera.service";

@Injectable({
  providedIn: 'root'
})
export class DiagnosisService {

  constructor(
    private api: ApiService,
    private cameraService: CameraService
  ) { }

  startDiagnosis() {
    const image = this.cameraService.takePicture();
    let userLocation;
  }

  captureImage() {
    // 작물 이미지 촬영
    const image = this.cameraService.takePicture();
  }

  getUserLocation() {
    // 사용자 위치 정보 가져오기
  }

  requestDiagnosis() {
    // 작물 진단 요청
  }
}
