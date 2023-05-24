import { Injectable } from '@angular/core';
import { MpBottomSheetService } from "@mapiacompany/ngx-bootstrap-modal";

@Injectable({
  providedIn: 'root'
})
export class NavigateService {
  constructor(
    private bottomSheet: MpBottomSheetService
  ) {
  }

  openLoginModal(onSuccess: () => void = () => {
  }) {
    import('../module/login/login-modal/login-modal.component').then(c => {
      this.bottomSheet.show(c.LoginModal, {
        ignoreBackdropClick: true, initialState: {
          onSuccess
        }
      })
    })
  }

  openDiseaseDetailModal(inputs: { diseaseCode?: number, diseaseName?: string, cropName?: string }) {
    import('../module/diagnosis/disease-detail-modal/disease-detail-modal.component').then(c => {
      this.bottomSheet.show(c.DiseaseDetailModalComponent, {
        initialState: {
          diseaseCode: inputs.diseaseCode,
          diseaseName: inputs.diseaseName,
          cropName: inputs.cropName
        }
      })
    })
  }
}
