import { Component, Input } from '@angular/core';
import { SyntaxSharedModule } from "../../shared/syntax-shared.module";
import { CropTypeBadge } from "../../../component/crop-type-badge/crop-type-badge.component";
import { DiseaseNamePipe } from "../../../pipe/disease-name.pipe";
import { ApiService } from "../../../service/api.service";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { AsyncStatus, bindStatus, observeProperty$ } from "@mapiacompany/armory";
import { filter, switchMap } from "rxjs/operators";
import { FormControl, Validators } from "@angular/forms";
import { AlertService, MpTextarea } from "@mapiacompany/styled-components";
import { ToastService } from "../../../service/toast.service";
import { BsModalRef } from "@mapiacompany/ngx-bootstrap-modal";

@Component({
  selector: 'app-reply-edit-modal',
  standalone: true,
  imports: [
    SyntaxSharedModule,
    CropTypeBadge,
    DiseaseNamePipe,
    MpTextarea,
  ],
  templateUrl: './reply-edit-modal.component.html',
  styleUrls: [ './reply-edit-modal.component.scss' ]
})
export class ReplyEditModalComponent {
  @Input() inquiryId: number;

  status$ = new BehaviorSubject(AsyncStatus.INITIAL);
  inquiry$: Observable<Inquiry> = observeProperty$(this, 'inquiryId').pipe(
    filter(id => !!id),
    switchMap(id => this.api.loadInquiryDetail(id).pipe(
      bindStatus(this.status$)
    ))
  );

  diagnosisStatus$ = new BehaviorSubject(AsyncStatus.INITIAL);

  diagnosisRecord$: Observable<DiagnosisRecord> = this.inquiry$.pipe(
    filter(inquiry => !!inquiry && !!inquiry.diagnosisRecordId),
    switchMap(({ diagnosisRecordId }) => this.api.getDiagnosisResult(diagnosisRecordId).pipe(
      bindStatus(this.diagnosisStatus$)
    ))
  )

  replyStatus$ = new BehaviorSubject(AsyncStatus.INITIAL);
  replyContent = new FormControl('', [ Validators.required ]);
  reply$ = this.inquiry$.pipe(
    filter(inquiry => !!inquiry && inquiry.replyId > -1),
    switchMap(({ replyId }) => this.api.loadInquiryReply(replyId).pipe(
      bindStatus(this.replyStatus$),
      tap(({ contents }) => this.replyContent.patchValue(contents))
    ))
  )

  constructor(
    private api: ApiService,
    private alert: AlertService,
    private toast: ToastService,
    private modalRef: BsModalRef
  ) {
  }

  submitReply() {
    this.api.replyToInquiry(this.inquiryId, this.replyContent.value).pipe(
      bindStatus(this.replyStatus$),
      tap(() => this.toast.show('답변이 등록되었습니다.')),
      tap(() => this.close())
    ).subscribe()
  }

  updateReply(replyId: number) {
    this.api.editReplyContent(replyId, this.replyContent.value).pipe(
      bindStatus(this.replyStatus$),
      tap(() => this.toast.show('답변이 수정되었습니다.')),
      tap(() => this.close())
    ).subscribe()
  }

  close() {
    this.modalRef.hide();
  }
}
