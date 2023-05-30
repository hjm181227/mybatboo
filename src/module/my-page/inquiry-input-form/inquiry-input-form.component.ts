import { Component, Input } from '@angular/core';
import { SyntaxSharedModule } from "../../shared/syntax-shared.module";
import { ApiService } from "../../../service/api.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AbstractBaseComponent, AsyncStatus, bindStatus } from "@mapiacompany/armory";
import { PageHeaderComponent } from "../../shared/component/page-header/page-header.component";
import { BsModalRef } from "@mapiacompany/ngx-bootstrap-modal";
import { CropTypeBadge } from "../../../component/crop-type-badge/crop-type-badge.component";
import { DiseaseNamePipe } from "../../../pipe/disease-name.pipe";
import { MpInput, MpTextarea } from "@mapiacompany/styled-components";
import { BottomFixedBar } from "../../../component/bottom-fixed-bar/bottom-fixed-bar";
import { BehaviorSubject, tap } from "rxjs";
import { ToastService } from "../../../service/toast.service";
import { Router } from "@angular/router";

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
    BottomFixedBar
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
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.modalRef.setClass('inquiry-input-form');
    this.form.record.patchValue(this.record);
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
}
