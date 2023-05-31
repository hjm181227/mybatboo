import { Component, Input } from '@angular/core';
import { SyntaxSharedModule } from "../../shared/syntax-shared.module";
import { BsModalRef } from "@mapiacompany/ngx-bootstrap-modal";
import { ApiService } from "../../../service/api.service";
import { AsyncStatus, bindStatus, observeProperty$ } from "@mapiacompany/armory";
import { filter, switchMap } from "rxjs/operators";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { PageHeaderComponent } from "../../shared/component/page-header/page-header.component";
import { CropTypeBadge } from "../../../component/crop-type-badge/crop-type-badge.component";
import { DiseaseNamePipe } from "../../../pipe/disease-name.pipe";

@Component({
  selector: 'app-inquiry-detail',
  standalone: true,
  imports: [
    SyntaxSharedModule,
    PageHeaderComponent,
    CropTypeBadge,
    DiseaseNamePipe
  ],
  templateUrl: './inquiry-detail.component.html',
  styleUrls: ['./inquiry-detail.component.scss']
})
export class InquiryDetailComponent {
  @Input() inquiryId: number;

  status$ = new BehaviorSubject(AsyncStatus.INITIAL);
  inquiry$: Observable<Inquiry> = observeProperty$(this, 'inquiryId').pipe(
    filter(id => !!id),
    switchMap(id => this.api.loadInquiryDetail(id).pipe(
      bindStatus(this.status$),
      tap(console.log)
    ))
  );

  diagnosisStatus$ = new BehaviorSubject(AsyncStatus.INITIAL);

  diagnosisRecord$: Observable<DiagnosisRecord> = this.inquiry$.pipe(
    filter(inquiry => !!inquiry && !!inquiry.diagnosisRecordId),
    switchMap(({ diagnosisRecordId }) => this.api.getDiagnosisResult(diagnosisRecordId).pipe(
      bindStatus(this.diagnosisStatus$),
      tap(console.log)
    ))
  )

  replyStatus$ = new BehaviorSubject(AsyncStatus.INITIAL);
  reply$ = this.inquiry$.pipe(
    filter(inquiry => !!inquiry && inquiry.replyId > -1),
    switchMap(({ replyId }) => this.api.loadInquiryReply(replyId).pipe(
      bindStatus(this.replyStatus$),
      tap(console.log)
    ))
  )

  constructor(
    private modalRef: BsModalRef,
    private api: ApiService,
  ) {
  }

  close() {
    this.modalRef.hide();
  }
}
