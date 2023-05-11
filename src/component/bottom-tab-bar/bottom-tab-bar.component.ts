import { Component } from '@angular/core';
import { CropCameraComponent } from "../crop-camera/crop-camera.component";
import { SyntaxSharedModule } from "../../module/shared/syntax-shared.module";
import { FormControl } from "@angular/forms";
import { CameraService } from "../../service/camera.service";
import { ApiService } from "../../service/api.service";
import { BsModalService } from "@mapiacompany/ngx-bootstrap-modal";

@Component({
  selector: 'bottom-tab-bar',
  standalone: true,
  imports: [
    SyntaxSharedModule,
    CropCameraComponent
  ],
  templateUrl: './bottom-tab-bar.component.html',
  styleUrls: [ './bottom-tab-bar.component.scss' ]
})
export class BottomTabBarComponent {
  activeTab: FormControl<'home' | 'camera' | 'user'> = new FormControl('home');

  constructor(
    private api: ApiService,
    private cameraService: CameraService,
    private modalService: BsModalService
  ) {
  }

  changeTab(tab) {
    if (this.activeTab.value === tab) return;
    this.activeTab.patchValue(tab);
  }

  takePicture() {
    this.cameraService.takePicture();
  }

  loadDiagnosis() {
    import('../../module/diagnosis/diagnosis-result/diagnosis-result.component').then(c => {
      this.modalService.show(c.DiagnosisResultComponent, {
        initialState: {
          diagnosisId: 64
        }
      })
    })
    // this.api.getDiagnosisResult(55).pipe(
    //   tap(console.log)
    // ).subscribe()
  }
}
