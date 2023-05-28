import { Component, Input } from '@angular/core';
import { SyntaxSharedModule } from "../../shared/syntax-shared.module";
import { DiseaseNamePipe } from "../../../pipe/disease-name.pipe";
import { MpBottomSheetService } from "@mapiacompany/ngx-bootstrap-modal";
import { NavigateService } from "../../../service/navigate.service";

@Component({
  selector: 'disease-list-item',
  standalone: true,
  imports: [
    SyntaxSharedModule,
    DiseaseNamePipe
  ],
  templateUrl: './disease-list-item.component.html',
  styleUrls: [ './disease-list-item.component.scss' ]
})
export class DiseaseListItem {
  @Input() diseaseItem: DiagnosisItem;

  constructor(
    private bottomSheet: MpBottomSheetService,
    private navigate: NavigateService
  ) {
  }

  get isSick() {
    switch (this.diseaseItem?.diseaseCode) {
      case 0:
      case 3:
      case 6:
      case 9:
        return false;
      default:
        return true;
    }
  }

  openDiseaseDetailModal() {
    this.navigate.openDiseaseDetailModal({
      sickKey: this.diseaseItem.sickKey,
      diseaseCode: this.diseaseItem.diseaseCode
    });
  }
}
