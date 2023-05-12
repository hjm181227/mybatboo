import { Component } from '@angular/core';
import { SyntaxSharedModule } from "../../module/shared/syntax-shared.module";
import { FormControl } from "@angular/forms";
import { CameraService } from "../../service/camera.service";
import { ApiService } from "../../service/api.service";
import { BsModalService } from "@mapiacompany/ngx-bootstrap-modal";
import { DiagnosisService } from "../../service/diagnosis.service";

@Component({
  selector: 'bottom-tab-bar',
  standalone: true,
  imports: [
    SyntaxSharedModule,
  ],
  templateUrl: './bottom-tab-bar.component.html',
  styleUrls: [ './bottom-tab-bar.component.scss' ]
})
export class BottomTabBarComponent {
  activeTab: FormControl<'home' | 'camera' | 'user'> = new FormControl('home');

  constructor(
    private api: ApiService,
    private cameraService: CameraService,
    private diagnosisService: DiagnosisService,
    private modalService: BsModalService
  ) {
  }

  changeTab(tab) {
    if (this.activeTab.value === tab) return;
    this.activeTab.patchValue(tab);
  }

  diagnose() {
    this.diagnosisService.startDiagnosis();
  }
}
