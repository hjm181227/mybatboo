import { Component } from '@angular/core';
import { SyntaxSharedModule } from "../../shared/syntax-shared.module";
import { PageHeaderComponent } from "../../shared/component/page-header/page-header.component";
import { BsModalRef, BsModalService } from "@mapiacompany/ngx-bootstrap-modal";
import { ApiService } from "../../../service/api.service";
import { DiagnosisService } from "../../../service/diagnosis.service";
import { Observable } from "rxjs";
import { CropTypeBadge } from "../../../component/crop-type-badge/crop-type-badge.component";
import { CropNamePipe } from "../../../pipe/crop-name.pipe";
import { DiseaseNamePipe } from "../../../pipe/disease-name.pipe";
import { CategoryNamePipe } from "../../../pipe/category-name.pipe";
import { Router } from "@angular/router";

@Component({
  selector: 'app-inquiry-record-select-modal',
  standalone: true,
  imports: [
    SyntaxSharedModule,
    PageHeaderComponent,
    CropTypeBadge,
    CropNamePipe,
    DiseaseNamePipe,
    CategoryNamePipe
  ],
  templateUrl: './inquiry-record-select-modal.component.html',
  styleUrls: [ './inquiry-record-select-modal.component.scss' ]
})
export class InquiryRecordSelectModalComponent {
  selectedRecord: DiagnosisRecord;

  recordList$: Observable<DiagnosisRecord[]> = this.api.loadUserDiagnosisRecords();

  constructor(
    private modalRef: BsModalRef,
    private api: ApiService,
    private diagnosis: DiagnosisService,
    private router: Router,
    private modalService: BsModalService,
  ) {
  }

  close() {
    this.modalRef.hide();
  }

  goToDiagnosis() {
    this.router.navigate([ '/main' ]).then(() => {
      this.modalRef.hide();
      this.diagnosis.startDiagnosis();
    });
  }

  select(record: DiagnosisRecord) {
    this.selectedRecord = record;
    this.close();
  }
}
