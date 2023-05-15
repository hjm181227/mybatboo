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
  openLoginModal() {
    import('../module/login/login-modal/login-modal.component').then(c => {
      this.bottomSheet.show(c.LoginModal, { ignoreBackdropClick: true })
    })
  }
}
