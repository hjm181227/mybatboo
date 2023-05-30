import { Component } from '@angular/core';
import { SyntaxSharedModule } from "../../shared/syntax-shared.module";
import { PageHeaderComponent } from "../../shared/component/page-header/page-header.component";
import { BsModalRef } from "@mapiacompany/ngx-bootstrap-modal";
import { ApiService } from "../../../service/api.service";
import { DiagnosisService } from "../../../service/diagnosis.service";
import { Observable } from "rxjs";
import { CropTypeBadge } from "../../../component/crop-type-badge/crop-type-badge.component";
import { CropNamePipe } from "../../../pipe/crop-name.pipe";
import { DiseaseNamePipe } from "../../../pipe/disease-name.pipe";

@Component({
  selector: 'app-inquiry-record-select-modal',
  standalone: true,
  imports: [
    SyntaxSharedModule,
    PageHeaderComponent,
    CropTypeBadge,
    CropNamePipe,
    DiseaseNamePipe
  ],
  templateUrl: './inquiry-record-select-modal.component.html',
  styleUrls: [ './inquiry-record-select-modal.component.scss' ]
})
export class InquiryRecordSelectModalComponent {
  selectedRecord: DiagnosisRecord;

  recordList$: Observable<DiagnosisRecord[]>;

  constructor(
    private modalRef: BsModalRef,
    private api: ApiService,
    private diagnosis: DiagnosisService
  ) {
  }

  close() {
    this.modalRef.hide();
  }

  goToDiagnosis() {
    this.diagnosis.startDiagnosis();
    this.close();
  }
}
