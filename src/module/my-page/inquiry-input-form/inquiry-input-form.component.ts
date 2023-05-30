import { Component, Input } from '@angular/core';
import { SyntaxSharedModule } from "../../shared/syntax-shared.module";
import { ApiService } from "../../../service/api.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AbstractBaseComponent, AsyncStatus, bindStatus } from "@mapiacompany/armory";
import { PageHeaderComponent } from "../../shared/component/page-header/page-header.component";
import { BsModalRef, MpBottomSheetService } from "@mapiacompany/ngx-bootstrap-modal";
import { CropTypeBadge } from "../../../component/crop-type-badge/crop-type-badge.component";
import { DiseaseNamePipe } from "../../../pipe/disease-name.pipe";
import { MpCallout, MpInput, MpTextarea } from "@mapiacompany/styled-components";
import { BottomFixedBar } from "../../../component/bottom-fixed-bar/bottom-fixed-bar";
import { BehaviorSubject, tap } from "rxjs";
import { ToastService } from "../../../service/toast.service";
import { Router } from "@angular/router";
import {
  InquiryRecordSelectModalComponent
} from "../inquiry-record-select-modal/inquiry-record-select-modal.component";

@Component({
  selector: 'app-inquiry-input-form',
  standalone: true,
  imports: [
    SyntaxSharedModule,
    PageHeaderComponent,
    CropTypeBadge,
    DiseaseNamePipe,
    MpInput,
    MpTextarea,
    BottomFixedBar,
    MpCallout
  ],
  templateUrl: './inquiry-input-form.component.html',
  styleUrls: [ './inquiry-input-form.component.scss' ]
})
export class InquiryInputFormComponent extends AbstractBaseComponent {
  @Input() record: DiagnosisRecord;

  form = {
    record: new FormControl(null),
    title: new FormControl('', [ Validators.required ]),
    contents: new FormControl('', [ Validators.required ])
  }

  formGroup = new FormGroup(this.form);
  status$ = new BehaviorSubject(AsyncStatus.INITIAL);

  constructor(
    private api: ApiService,
    private modalRef: BsModalRef,
    private toast: ToastService,
    private router: Router,
    private bottomSheet: MpBottomSheetService
  ) {
    super();
  }

  ngOnInit() {
    this.modalRef.setClass('inquiry-input-form');
    if (this.record) {
      this.form.record.patchValue(this.record);
    }
  }

  close() {
    this.modalRef.hide();
  }

  submit() {
    const { record, title, contents } = this.formGroup.value;
    this.api.sendInquiry({ diagnosisId: record.recordId, title, contents }).pipe(
      bindStatus(this.status$),
      tap(() => this.toast.show('문의가 작성되었습니다.')),
      tap(() => this.close()),
      tap(() => this.router.navigate([ '/my-page', 'inquiry' ]))
    ).subscribe();
  }

  openRecordSelector() {
    const selectModal = this.bottomSheet.show(InquiryRecordSelectModalComponent);
    selectModal.onHide.pipe(
      tap(() => selectModal.content)
    )
  }
}
